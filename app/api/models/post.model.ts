export interface Post {
    id: number,
    title: string,
    slug: string,
    content: string,
    hashtag: string | null,
    createdAt: Date,
    updatedAt: Date | null,
}