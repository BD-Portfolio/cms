import { PrismaClient } from "@prisma/client";
import { Post } from "../models/post.model";

export interface PostData {
    title: string,
    slug: string,
    content: string,
    hashtag?: string,
}

export class PostRepository {

    public static async getAllPosts(db: PrismaClient): Promise<Post[] | null> {
        // fetch all posts from DB
        return await db.post.findMany();
    }

    public static async getPostById(db: PrismaClient, id: number): Promise<Post | null> {
        // fetch post by id from DB
        return await db.post.findUnique({
            where: {
                id: id
            }
        });
    }

    public static async createPost(db: PrismaClient, postData: PostData): Promise<Post | null> {
        // insert post data in DB
        return await db.post.create({
            data: postData
        });
    }

    public static async getPostBySlug(db: PrismaClient, slug: string): Promise<Post | null> {
        // fetch post by slug from DB
        return await db.post.findUnique({
            where: {
                slug: slug
            }
        });
    }

    public static async deletePost(db: PrismaClient, id: number): Promise<Post | null> {
        // delete post by ID from DB
        return await db.post.delete({
            where: {
                id: id
            }
        });
    }

    public static async updatePost(db: PrismaClient, postData: PostData, id: number): Promise<Post | null> {
        // update post data in DB
        return await db.post.update({
            where: {
                id: id
            },
            data: { ...postData, updatedAt: new Date() }
        });
    }

}

