import { cloudinaryLoader } from "@/genericFunctions/geneFunc";

const SITE_URL = "https://www.ebike.pk";
const DEFAULT_SHARE_IMAGE = "https://www.ebike.pk/favicon.png";

function toSecureUrl(url?: string | null) {
    if (!url) {
        return "";
    }

    if (url.startsWith("//")) {
        return `https:${url}`;
    }

    if (url.startsWith("http://")) {
        return url.replace("http://", "https://");
    }

    if (url.startsWith("https://")) {
        return url;
    }

    if (url.startsWith("/")) {
        return `${SITE_URL}${url}`;
    }

    return `${SITE_URL}/${url.replace(/^\/+/, "")}`;
}

function stripHtml(value?: string | null) {
    if (!value) {
        return "";
    }

    return value
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function trimText(value?: string | null, limit = 160) {
    const text = stripHtml(value);
    if (text.length <= limit) {
        return text;
    }

    return `${text.slice(0, limit).trim()}...`;
}

function resolveBlogShareImage(featuredImage?: string | null) {
    const rawImage = featuredImage?.split(" #$# ")[0]?.trim();
    if (!rawImage) {
        return DEFAULT_SHARE_IMAGE;
    }

    return toSecureUrl(cloudinaryLoader(toSecureUrl(rawImage), 1200, "auto"));
}

function resolveClassifiedShareImage(images?: any) {
    const rawImage = Array.isArray(images) ? images.find(Boolean) : images;
    if (!rawImage) {
        return DEFAULT_SHARE_IMAGE;
    }

    return toSecureUrl(cloudinaryLoader(toSecureUrl(rawImage), 1200, "auto"));
}

export {
    SITE_URL,
    DEFAULT_SHARE_IMAGE,
    toSecureUrl,
    stripHtml,
    trimText,
    resolveBlogShareImage,
    resolveClassifiedShareImage
};
