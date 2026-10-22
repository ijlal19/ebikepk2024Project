import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_FILE_LENGTH = Math.ceil(10 * 1024 * 1024 / 3) * 4 + 100;

export async function POST(request: Request) {
  if (Number(request.headers.get('content-length')) > MAX_FILE_LENGTH + 100) {
    return NextResponse.json({ error: 'Image must be smaller than 10 MB' }, { status: 413 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid upload request' }, { status: 400 });
  }

  const file = body?.file;
  if (typeof file !== 'string' || !/^data:image\/(jpeg|png|webp|gif|avif);base64,[A-Za-z0-9+/]+={0,2}$/.test(file)) {
    return NextResponse.json({ error: 'A valid image file is required' }, { status: 400 });
  }
  if (file.length > MAX_FILE_LENGTH) {
    return NextResponse.json({ error: 'Image must be smaller than 10 MB' }, { status: 413 });
  }

  const cloudName = process.env.USED_BIKE_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.USED_BIKE_CLOUDINARY_API_KEY;
  const apiSecret = process.env.USED_BIKE_CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Used bike image upload is not configured' }, { status: 503 });
  }

  const form = new FormData();
  form.set('file', file);
  form.set('folder', 'used_bikes');

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`, {
      method: 'POST',
      headers: { Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}` },
      body: form,
      cache: 'no-store',
      signal: AbortSignal.timeout(60_000),
    });
    const result = await response.json();
    if (!response.ok || !result.secure_url) {
      return NextResponse.json({ error: 'Used bike image upload failed. Please try again.' }, { status: 502 });
    }
    return NextResponse.json({ secure_url: result.secure_url, public_id: result.public_id });
  } catch {
    return NextResponse.json({ error: 'Used bike image upload failed. Please try again.' }, { status: 502 });
  }
}
