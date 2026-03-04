import Gconfig from "globalconfig";

async function forumRequest(endpoint: string, options: RequestInit = {}) {
    try {
        const response = await fetch(Gconfig.ebikeApi + endpoint, {
            headers: { "Content-Type": "application/json" },
            ...options
        });

        const data = await response.json();
        return data;
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

export {
    getMainCategory,
    getSubCategory,
    getSubCatgeorybyId,
    postThread,
    getAllthread,
    getthreadbyId,
    getAllThreadComments,
    postthreadComment,
    ViewCountAdd
}
