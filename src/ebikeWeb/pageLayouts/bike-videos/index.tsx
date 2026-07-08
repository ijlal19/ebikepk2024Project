'use client';
import React, { useEffect, useMemo, useState } from "react";
import styles from './index.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Data from "./data";
import Link from "next/link";
import Image from "next/image";

type YoutubeVideo = {
    title: string;
    video_url: string;
    thumbnail_url: string;
    videoId?: string;
    publishedAt?: string;
};

const formatDate = (date?: string) => {
    if (!date) return "";

    try {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    } catch (error) {
        return "";
    }
};

const VideoCard = ({ video, featured = false }: { video: YoutubeVideo; featured?: boolean }) => (
    <Link href={video.video_url} target="_blank" className={`${styles.video_card} ${featured ? styles.featured_card : ""}`}>
        <div className={styles.thumbnail_box}>
            <Image src={video.thumbnail_url} alt={video.title} fill sizes={featured ? "(max-width: 768px) 100vw, 760px" : "(max-width: 768px) 100vw, 380px"} className={styles.thumbnail} />
            <span className={styles.play_badge}><PlayCircleIcon className={styles.play_icon} /></span>
        </div>
        <div className={styles.video_content}>
            <p className={styles.video_title}>{video.title}</p>
            <div className={styles.video_meta}>
                <span>ebike.pk</span>
                {video.publishedAt && <span>{formatDate(video.publishedAt)}</span>}
            </div>
            {featured && (
                <span className={styles.watch_link}>
                    Watch Video <OpenInNewIcon className={styles.open_icon} />
                </span>
            )}
        </div>
    </Link>
);

const Bike_Videos = () => {
    const [videos, setVideos] = useState<YoutubeVideo[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            setIsLoading(true);

            try {
                const response = await fetch('/api/youtube/latest-videos?limit=24');
                const res = await response.json();

                if (res?.success && Array.isArray(res?.data) && res.data.length > 0) {
                    setVideos(res.data);
                    return;
                }

                setVideos(Data);
            } catch (error) {
                console.log(error);
                setVideos(Data);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const filteredVideos = useMemo(() => {
        const keyword = searchTerm.trim().toLowerCase();
        if (!keyword) return videos;

        return videos.filter((video) => video.title.toLowerCase().includes(keyword));
    }, [searchTerm, videos]);

    const featuredVideo = filteredVideos[0];
    const videoList = filteredVideos.slice(1);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.heading}>Bike Videos</h1>
                        <p className={styles.subheading}>Latest motorcycle reviews, market updates, and e-bike videos from ebike.pk.</p>
                    </div>
                    <form className={styles.input_box} onSubmit={(event) => event.preventDefault()}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search"
                            className={styles.input} />
                        <button className={styles.btn} aria-label="Search videos"><SearchIcon className={styles.icon} /></button>
                    </form>
                </div>

                {isLoading ? (
                    <div className={styles.loading_grid}>
                        {[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className={styles.skeleton_card} />)}
                    </div>
                ) : filteredVideos.length > 0 ? (
                    <>
                        {featuredVideo && (
                            <section className={styles.featured_section}>
                                <div className={styles.section_header}>
                                    <h2 className={styles.section_title}>Featured Video</h2>
                                </div>
                                <VideoCard video={featuredVideo} featured />
                            </section>
                        )}

                        <section className={styles.latest_section}>
                            <div className={styles.section_header}>
                                <h2 className={styles.section_title}>Latest Bike Videos</h2>
                                <Link href="https://www.youtube.com/@ebikepk/videos" target="_blank" className={styles.channel_link}>
                                    View YouTube Channel <OpenInNewIcon className={styles.open_icon} />
                                </Link>
                            </div>

                            <div className={styles.card_section}>
                                {videoList.map((item) => (
                                    <VideoCard key={item.videoId || item.video_url} video={item} />
                                ))}
                            </div>
                        </section>
                    </>
                ) : (
                    <p className={styles.no_data}>No Data Found</p>
                )}
            </div>
        </div>
    )
}
export default Bike_Videos
