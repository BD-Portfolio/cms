import { PrismaClient } from "@prisma/client";
import { Page } from "../models/page.model";

export interface PageData {
    title: string,
    slug: string,
    content: string,
    hashtag?: string,
}

export class PageRepository {

    public static async getAllPages(db: PrismaClient): Promise<Page[] | null> {
        // fetch all pages from DB
        return await db.page.findMany();
    }

    public static async getPageById(db: PrismaClient, id: number): Promise<Page | null> {
        // fetch page by id from DB
        return await db.page.findUnique({
            where: {
                id: id
            }
        });
    }

    public static async createPage(db: PrismaClient, pageData: PageData): Promise<Page | null> {
        // insert page data in DB
        return await db.page.create({
            data: pageData
        });
    }

    public static async getPageBySlug(db: PrismaClient, slug: string): Promise<Page | null> {
        // fetch page by slug from DB
        return await db.page.findUnique({
            where: {
                slug: slug
            }
        });
    }

    public static async deletePage(db: PrismaClient, id: number): Promise<Page | null> {
        // delete page by ID from DB
        return await db.page.delete({
            where: {
                id: id
            }
        });
    }

    public static async updatePage(db: PrismaClient, pageData: PageData, id: number): Promise<Page | null> {
        // update page data in DB
        return await db.page.update({
            where: {
                id: id
            },
            data: { ...pageData, updatedAt: new Date() }
        });
    }

}