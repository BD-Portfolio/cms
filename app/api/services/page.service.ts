import { PrismaClient } from "@prisma/client";
import { DBConnection } from "../utils/db.config";
import { HTTP_STATUS_CODE } from "../utils/httpstatus";
import { CustomResponse } from "../utils/response";
import { createSlug } from "../utils/common.utils";
import { NextRequest } from "next/server";
import { PageData, PageRepository } from "../repositories/page.repository";
import { validatePage } from "../validations/page.validation";

export class PageService {

    // retrieves all pages from the database
    public static async getAllPages() {

        // create a custom response object
        const response: CustomResponse = {
            message: "",
            httpStatus: 404
        };

        try {

            // fetch DB connection
            const db: PrismaClient = DBConnection.getDbConnection();

            // fetch all pages from the database
            const pages = await PageRepository.getAllPages(db);

            // return response with error
            if (!pages) {
                response.message = "Failed to fetch pages";
                response.error = "Failed to fetch pages";
                response.httpStatus = HTTP_STATUS_CODE.NOT_FOUND;
                return response;
            }

            if (!pages.length) {
                // no pages found in DB
                response.message = "No pages found!";
            } else {
                // set the response for pages found
                response.message = "Pages fetched successfully!";
            }

            // set http status and data
            response.httpStatus = HTTP_STATUS_CODE.OK;
            response.data = pages;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while fetching all pages : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

    // creates new page in the database
    public static async createPage(req: NextRequest) {

        // create a custom response object
        const response: CustomResponse = {
            message: "",
            httpStatus: 404
        };

        try {

            // fetch DB connection
            const db: PrismaClient = DBConnection.getDbConnection();

            // extract payload
            const data = await req.json();

            // validate payload
            const isValid = validatePage(data);

            // return on invalid payload
            if (isValid.error) {
                response.message = isValid.msg;
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                response.error = isValid.msg;
                return response;
            }

            // create slug if not found in payload
            const slug = data.slug ?? createSlug(data.title as string);

            // check if slug already exists
            const existingPage = await PageRepository.getPageBySlug(db, slug);

            // return as slug already exists
            if (existingPage) {
                response.error = "Duplicate slug, already exists";
                response.message = "Slug already exists, please use unique slug";
                response.httpStatus = HTTP_STATUS_CODE.DUPLICATE;
                return response;
            }

            // create payload to save in DB
            const pagePayload: PageData = {
                title: data.title as string,
                content: data.content as string,
                slug: slug,
                hashtag: data.hashtag ?? null,
            }

            // create a new page and add in DB
            const page = await PageRepository.createPage(db, pagePayload);

            // return response with error
            if (!page) {
                response.message = "Failed to create new page";
                response.error = "Failed to create new page";
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                return response;
            }

            // set http status, data and message
            response.message = "Page created successfully!";
            response.httpStatus = HTTP_STATUS_CODE.CREATED;
            response.data = page;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while creating new page : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

    // delete page from the database by id
    public static async deletePage(id: number) {

        // create a custom response object
        const response: CustomResponse = {
            message: "",
            httpStatus: 404
        };

        try {

            // return if id not found
            if (!id) {
                response.message = "ID is mandatory";
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                response.error = "ID is mandatory";
                return response;
            }

            // fetch DB connection
            const db: PrismaClient = DBConnection.getDbConnection();

            // // get the page whether it exists or not
            // const page = await PageRepository.getPageById(db, Number(id));

            // if (!page) {
            //     response.error = "Page not found";
            //     response.message = "Page not found";
            //     response.httpStatus = HTTP_STATUS_CODE.NOT_FOUND;
            //     return response;
            // }

            // deletes a page by id
            const deletedPage = await PageRepository.deletePage(db, Number(id));

            // check if page is not deleted
            if (!deletedPage) {
                response.error = "Failed to delete page";
                response.message = "Failed to delete page";
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                return response;
            }

            // set http status, data and message
            response.message = "Page deleted successfully!";
            response.httpStatus = HTTP_STATUS_CODE.OK;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while deleting page : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

    // updates page in the database
    public static async updatePage(req: NextRequest, id: number) {

        // create a custom response object
        const response: CustomResponse = {
            message: "",
            httpStatus: 404
        };

        try {

            // fetch DB connection
            const db: PrismaClient = DBConnection.getDbConnection();

            // extract payload
            const data = await req.json();

            // return if id not found
            if (!id) {
                response.message = "ID is mandatory";
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                response.error = "ID is mandatory";
                return response;
            }

            // validate payload
            const isValid = validatePage(data);

            // return on invalid payload
            if (isValid.error) {
                response.message = isValid.msg;
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                response.error = isValid.msg;
                return response;
            }

            // get the page whether it exists or not
            const pageExists = await PageRepository.getPageById(db, Number(id));

            if (!pageExists) {
                response.error = "Page not found";
                response.message = "Page not found";
                response.httpStatus = HTTP_STATUS_CODE.NOT_FOUND;
                return response;
            }

            // create slug if not found in payload
            const slug = data.slug ?? createSlug(data.title as string);

            // create payload to save in DB
            const pagePayload: PageData = {
                title: data.title as string,
                content: data.content as string,
                slug: slug,
                hashtag: data.hashtag ?? null,
            }

            // update page in DB
            const page = await PageRepository.updatePage(db, pagePayload, Number(id));

            // return response with error
            if (!page) {
                response.message = "Failed to update page";
                response.error = "Failed to update page";
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                return response;
            }

            // set http status, data and message
            response.message = "Page updated successfully!";
            response.httpStatus = HTTP_STATUS_CODE.OK;
            response.data = page;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while updating page : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

    // get page from the database by id
    public static async getPageById(id: number) {

        // create a custom response object
        const response: CustomResponse = {
            message: "",
            httpStatus: 404
        };

        try {

            // return if id not found
            if (!id) {
                response.message = "ID is mandatory";
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                response.error = "ID is mandatory";
                return response;
            }

            // fetch DB connection
            const db: PrismaClient = DBConnection.getDbConnection();

            // deletes a page by id
            const page = await PageRepository.getPageById(db, Number(id));

            // check if page found
            if (!page) {
                response.error = "Page not found";
                response.message = "Page not found";
                response.httpStatus = HTTP_STATUS_CODE.NOT_FOUND;
                return response;
            }

            // set http status, data and message
            response.message = "Page fetched successfully!";
            response.httpStatus = HTTP_STATUS_CODE.OK;
            response.data = page;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while fetching page : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

}