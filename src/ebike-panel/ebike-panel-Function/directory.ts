import Gconfig from 'globalconfig';

export type DirectoryKind = 'mechanic' | 'dealer';
export type DirectoryEdits = Partial<{
    shop_name: string;
    address: string;
    phone: string;
    phone2: string | null;
    brand_id: number;
    city_id: number;
    mechanic_type: number;
    request_for_featured: boolean;
    is_approved: boolean;
    is_featured: boolean;
    uid: string;
}>;

async function directoryRequest(path: string, edits?: DirectoryEdits) {
    const userCookie = require('js-cookie').get('userData_ebike_panel');
    const token = userCookie ? JSON.parse(userCookie)?.accessToken : undefined;
    if (!token) throw new Error('Your session has expired. Please log in again.');

    const response = await fetch(Gconfig.ebikeApi + path, {
        method: edits ? 'PUT' : 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        cache: 'no-store',
        ...(edits ? { body: JSON.stringify(edits) } : {}),
    });
    const result = await response.json();
    if (!response.ok || result?.success === false || result?.auth === false) {
        throw new Error(result?.info || result?.message || `Request failed (${response.status}).`);
    }
    return result;
}

export async function getDirectoryRecord(kind: DirectoryKind, id: number | string) {
    // Dealer reads use singular "dealer"; writes use plural "dealers".
    const result = await directoryRequest(`${kind}/get-${kind}-by-id/${encodeURIComponent(id)}`);
    const record = result?.data ?? result;
    if (!record?.id) throw new Error(`Unable to load this ${kind}.`);
    return record;
}

export async function updateDirectoryRecord(kind: DirectoryKind, id: number | string, edits: DirectoryEdits) {
    const prefix = kind === 'dealer' ? 'dealers' : 'mechanic';
    const result = await directoryRequest(`${prefix}/update-${kind}/${encodeURIComponent(id)}`, edits);
    if (result?.success !== true) throw new Error(result?.info || `Unable to update this ${kind}.`);
    return result;
}
