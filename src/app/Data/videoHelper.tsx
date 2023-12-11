export interface videoDataType {
    _id: string,
    videoLink: string,
    categoryName: string | null,
    thumbnail: string,
    title: string | null;
    description: string | null;
}

export function videoLinkCreator(_id: string) {
    return `https://www.youtube.com/watch?v=${_id}`
}

export function videoThumbnailLinkCreator(_id: string) {
    return `https://img.youtube.com/vi/${_id}/hqdefault.jpg`
}