import { NextRequest, NextResponse } from 'next/server';

const CHANNEL_ID = 'UCmudYXR1HtpZTIBFeDYn2fg';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CHANNEL_VIDEOS_URL = 'https://www.youtube.com/@ebikepk/videos';

type YoutubeVideo = {
  title: string;
  thumbnail_url: string;
  video_url: string;
  videoId: string;
  publishedAt?: string;
};

const decodeXml = (value: string) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const decodeJsonString = (value: string) => {
  try {
    return JSON.parse(`"${value.replace(/"/g, '\\"')}"`);
  } catch (error) {
    return value.replace(/\\u0026/g, '&').replace(/\\"/g, '"');
  }
};

const getTagValue = (entry: string, tagName: string) => {
  const match = entry.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`));
  return match ? decodeXml(match[1].trim()) : '';
};

const getAttributeValue = (entry: string, tagName: string, attributeName: string) => {
  const match = entry.match(new RegExp(`<${tagName}[^>]*${attributeName}="([^"]+)"`));
  return match ? decodeXml(match[1]) : '';
};

const getBestThumbnailUrl = async (videoId: string, fallbackUrl: string) => {
  const candidates = [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
    fallbackUrl,
  ];

  for (const url of candidates) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        next: { revalidate: 86400 },
      });

      if (response.ok) {
        return url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return fallbackUrl;
};

const parseVideosFromFeed = (xml: string, limit: number): YoutubeVideo[] => {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

  return entries
    .map((entry) => {
      const videoId = getTagValue(entry, 'yt:videoId');
      const videoUrl = getAttributeValue(entry, 'link', 'href');

      return {
        title: getTagValue(entry, 'title'),
        thumbnail_url: getAttributeValue(entry, 'media:thumbnail', 'url') || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        video_url: videoUrl || `https://www.youtube.com/watch?v=${videoId}`,
        videoId,
        publishedAt: getTagValue(entry, 'published'),
      };
    })
    .filter((video) => video.videoId && video.video_url.includes('/watch?v='))
    .slice(0, limit);
};

const parseVideosFromChannelPage = (html: string, limit: number): YoutubeVideo[] => {
  const videos: YoutubeVideo[] = [];
  const seen = new Set<string>();
  const matches = html.matchAll(/"videoId":"([^"]+)"[\s\S]{0,1600}?"title":\{"content":"((?:\\.|[^"\\])*)"/g);

  for (const match of matches) {
    const videoId = match[1];
    const title = decodeJsonString(match[2]);

    if (!videoId || !title || seen.has(videoId) || title.includes('قطار میں شامل کریں')) {
      continue;
    }

    seen.add(videoId);
    videos.push({
      title,
      thumbnail_url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      video_url: `https://www.youtube.com/watch?v=${videoId}`,
      videoId,
    });

    if (videos.length >= limit) break;
  }

  return videos;
};

const mergeVideos = (primaryVideos: YoutubeVideo[], fallbackVideos: YoutubeVideo[], limit: number) => {
  const seen = new Set<string>();
  const merged: YoutubeVideo[] = [];

  [...primaryVideos, ...fallbackVideos].forEach((video) => {
    const key = video.videoId || video.video_url;
    if (!key || seen.has(key)) return;

    seen.add(key);
    merged.push(video);
  });

  return merged.slice(0, limit);
};

export async function GET(request: NextRequest) {
  try {
    const limitParam = Number(request.nextUrl.searchParams.get('limit') || 4);
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 24) : 4;

    const response = await fetch(FEED_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        Accept: 'application/atom+xml,application/xml,text/xml',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`YouTube feed responded with ${response.status}`);
    }

    const xml = await response.text();
    const feedVideos = parseVideosFromFeed(xml, limit);
    let fallbackVideos: YoutubeVideo[] = [];

    if (feedVideos.length < limit) {
      const channelResponse = await fetch(CHANNEL_VIDEOS_URL, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        },
        next: { revalidate: 3600 },
      });

      if (channelResponse.ok) {
        fallbackVideos = parseVideosFromChannelPage(await channelResponse.text(), limit);
      }
    }

    const videos = await Promise.all(
      mergeVideos(feedVideos, fallbackVideos, limit).map(async (video) => ({
        ...video,
        thumbnail_url: await getBestThumbnailUrl(video.videoId, video.thumbnail_url),
      }))
    );

    if (videos.length === 0) {
      throw new Error('No regular videos found in YouTube feed');
    }

    return NextResponse.json({
      success: true,
      source: CHANNEL_VIDEOS_URL,
      data: videos,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        source: CHANNEL_VIDEOS_URL,
        data: [],
        message: error instanceof Error ? error.message : 'Unable to load YouTube videos',
      },
      { status: 502 }
    );
  }
}
