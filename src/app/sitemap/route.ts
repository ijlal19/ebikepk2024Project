import { NextResponse } from 'next/server';

export async function GET() {
    const baseUrl = 'https://ebike.pk';
    const urls = [
        { loc: `${baseUrl}/`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/used-bikes`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/honda`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/honda/honda-pridor/3`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/honda/honda-cg-125/5`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/honda/honda-cd-70/1`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/honda/honda-cd-70-dream/2`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/honda/honda-cb-150f/7`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/honda/honda-cb-125f/6`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/honda/honda-cb-250f/8`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/suzuki`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/suzuki/suzuki-bandit/38`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/suzuki/suzuki-gd-110/36`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/suzuki/suzuki-gd-110s/22`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/suzuki/suzuki-gs-150/37`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/new-bikes/suzuki/suzuki-gs-150-se/20`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/blog`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/used-bikes/bike-by-brand/suzuki/6`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/used-bikes/bike-by-brand/kawasaki/2`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/used-bikes/bike-by-brand/benelli/41`, lastmod: new Date().toISOString() },
        { loc: `${baseUrl}/used-bikes/bike-by-brand/eagle/20`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/zxmco/10`, lastmod: new Date().toISOString() }, 
         { loc: `${baseUrl}/used-bikes/bike-by-brand/sport/38`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/metro/15`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/ducati/14`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/ghani/9`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/bmw/12`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/osaka/40`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/china/32`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/harley_davidson/35`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/aprilia/37`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/crown/25`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/new-bikes/used-bikes/bike-by-brand/treet/11`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/ktm/39`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/derbi/36`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/ravi/22`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/united/8`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/unique/16`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/road_prince/19`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/super_power/5`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/honda/1`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-brand/hi_speed/24`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/karachi/1`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/lahore/2`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/islamabad/3`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/peshawer/4`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/quetta/5`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/faisalabad/6`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/hyderabad/7`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/rawalpindi/8`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/gujranwala/9`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/bahawalpur/11`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/sargodha/12`, lastmod: new Date().toISOString() },
         { loc: `${baseUrl}/used-bikes/bike-by-city/sialkot/13`, lastmod: new Date().toISOString() },

        // Add more URLs dynamically as needed
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
            .map(
                (url) => `
        <url>
            <loc>${url.loc}</loc>
            <lastmod>${url.lastmod}</lastmod>
        </url>
        `
            )
            .join('')}
    </urlset>`;

    return new NextResponse(sitemap, {
        headers: { 'Content-Type': 'application/xml' },
    });
}