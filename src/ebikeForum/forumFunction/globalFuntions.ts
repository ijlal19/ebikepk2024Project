import Gconfig from "globalconfig";

const forumViewRequestCache = new Map<string, number>();
const FORUM_VIEW_DEBOUNCE_MS = 1500;
const forumGetRequestCache = new Map<string, { data?: any; promise?: Promise<any>; timestamp: number }>();
const FORUM_GET_CACHE_MS = 5000;

function clearForumGetCache() {
    forumGetRequestCache.clear();
}

async function forumRequest(endpoint: string, options: RequestInit = {}) {
    const method = String(options?.method || "GET").toUpperCase();
    const isGetRequest = method === "GET";
    const cacheKey = endpoint;

    if (isGetRequest) {
        const cachedEntry = forumGetRequestCache.get(cacheKey);
        const now = Date.now();

        if (cachedEntry?.data && now - cachedEntry.timestamp < FORUM_GET_CACHE_MS) {
            return cachedEntry.data;
        }

        if (cachedEntry?.promise) {
            return cachedEntry.promise;
        }
    }

    try {
        const requestPromise = fetch(Gconfig.ebikeApi + endpoint, {
            headers: { "Content-Type": "application/json" },
            ...options
        })
            .then(async (response) => {
                const data = await response.json();

                if (isGetRequest) {
                    forumGetRequestCache.set(cacheKey, {
                        data,
                        timestamp: Date.now()
                    });
                } else {
                    clearForumGetCache();
                }

                return data;
            })
            .catch((err) => {
                if (isGetRequest) {
                    forumGetRequestCache.delete(cacheKey);
                }
                throw err;
            });

        if (isGetRequest) {
            forumGetRequestCache.set(cacheKey, {
                promise: requestPromise,
                timestamp: Date.now()
            });
        }

        return await requestPromise;
    } catch (err) {
        console.log(err);
        return { success: false, data: [] };
    }
}

function getMainCategory() {
    return forumRequest(`new-forum/get-new-forum-main-categ`, {
        method: "GET"
    });
}

function getSubCategory() {
    return forumRequest(`new-forum/get-new-forum-sub-categ`, {
        method: "GET"
    });
}

function getSubCatgeorybyId(id: any) {
    return forumRequest(`new-forum/new-forum-sub-categ-byId/${id}`, {
        method: "GET"
    });
}

function postThread(data: any) {
    return forumRequest(`new-forum/crete-new-forum-thread`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}

function getAllthread() {
    return forumRequest(`new-forum/get-new-forum-thread`, {
        method: "GET"
    });
}

function getthreadbyId(id: any) {
    return forumRequest(`new-forum/get-new-forum-thread/${id}`, {
        method: "GET"
    });
}

function getAllThreadComments() {
    return forumRequest(`new-forum/get-new-forum-comment`, {
        method: "GET"
    });
}

function postthreadComment(data: any) {
    return forumRequest(`new-forum/crete-new-forum-comment`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}

function ViewCountAdd(data: any) {
    return forumRequest(`new-forum/crete-new-forum-view-count`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}

function updateMainCategoryById(id: any, payload: any) {
    return forumRequest(`new-forum/update-new-forum-main-categ/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

function updateSubCategoryById(id: any, payload: any) {
    return forumRequest(`new-forum/update-new-forum-sub-categ/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

function updateThreadById(id: any, payload: any) {
    return forumRequest(`new-forum/update-forum-thread/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

function updateThreadCommentById(id: any, payload: any) {
    return forumRequest(`new-forum/update-new-forum-comment/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

function getCurrentForumViews(item: any) {
    const legacyViewCount = Number(item?.ViewCount?.[0]?.count);
    if (Number.isFinite(legacyViewCount)) {
        return legacyViewCount;
    }

    const directViewsCount = Number(item?.views_count);
    if (Number.isFinite(directViewsCount)) {
        return directViewsCount;
    }

    return 0;
}

function getForumViewCacheKey(type: "main" | "sub" | "thread" | "comment", item: any) {
    return `${type}-${String(item?.id || "")}`;
}

function incrementForumView(type: "main" | "sub" | "thread" | "comment", item: any) {
    if (!item || typeof item !== "object" || !item?.id) {
        return Promise.resolve({ success: false });
    }

    const cacheKey = getForumViewCacheKey(type, item);
    const now = Date.now();
    const lastTriggeredAt = forumViewRequestCache.get(cacheKey) || 0;
    if (now - lastTriggeredAt < FORUM_VIEW_DEBOUNCE_MS) {
        return Promise.resolve({ success: true, skipped: true });
    }

    forumViewRequestCache.set(cacheKey, now);

    const views_count = getCurrentForumViews(item) + 1;

    let request: Promise<any>;
    if (type === "main") {
        request = updateMainCategoryById(item?.id, {
            name: item?.name || "",
            description: item?.description || "",
            views_count
        });
    } else if (type === "sub") {
        request = updateSubCategoryById(item?.id, {
            name: item?.name || "",
            description: item?.description || "",
            main_categ_id: Number(item?.main_categ_id || item?.mainCategory?.id),
            views_count
        });
    } else if (type === "thread") {
        request = updateThreadById(item?.id, {
            title: item?.title || "",
            description: item?.description || "",
            sub_categ_id: Number(item?.sub_categ_id || item?.subCategory?.id),
            views_count
        });
    } else {
        request = updateThreadCommentById(item?.id, {
            description: item?.description || "",
            thread_id: Number(item?.thread_id || item?.thread?.id),
            title: item?.title || "Thread Comment",
            views_count
        });
    }

    return request.catch((err) => {
        forumViewRequestCache.delete(cacheKey);
        throw err;
    });
}

export {
    getMainCategory,
    getSubCategory,
    getSubCatgeorybyId,
    postThread,
    getAllthread,
    getthreadbyId,
    getAllThreadComments,
    postthreadComment,
    ViewCountAdd,
    updateMainCategoryById,
    updateSubCategoryById,
    updateThreadById,
    updateThreadCommentById,
    getCurrentForumViews,
    incrementForumView,
    clearForumGetCache
}
