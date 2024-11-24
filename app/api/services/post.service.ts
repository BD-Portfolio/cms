import { PrismaClient } from "@prisma/client";
import { PostData, PostRepository } from "../repositories/post.repository";
import { DBConnection } from "../utils/db.config";
import { HTTP_STATUS_CODE } from "../utils/httpstatus";
import { CustomResponse } from "../utils/response";
import { validatePost } from "../validations/post.validation";
import { createSlug } from "../utils/common.utils";
import { NextRequest } from "next/server";

export class PostService {

    // retrieves all posts from the database
    public static async getAllPosts() {

        // create a custom response object
        const response: CustomResponse = {
            message: "",
            httpStatus: 404
        };

        try {

            // fetch DB connection
            const db: PrismaClient = DBConnection.getDbConnection();

            // fetch all posts from the database
            const posts = await PostRepository.getAllPosts(db);

            // return response with error
            if (!posts) {
                response.message = "Failed to fetch posts";
                response.error = "Failed to fetch posts";
                response.httpStatus = HTTP_STATUS_CODE.NOT_FOUND;
                return response;
            }

            if (!posts.length) {
                // no posts found in DB
                response.message = "No posts found!";
            } else {
                // set the response for posts found
                response.message = "Posts fetched successfully!";
            }

            // set http status and data
            response.httpStatus = HTTP_STATUS_CODE.OK;
            response.data = posts;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while fetching all posts : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

    // creates new post in the database
    public static async createPost(req: NextRequest) {

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
            const isValid = validatePost(data);

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
            const existingPost = await PostRepository.getPostBySlug(db, slug);

            // return as slug already exists
            if (existingPost) {
                response.error = "Duplicate slug, already exists";
                response.message = "Slug already exists, please use unique slug";
                response.httpStatus = HTTP_STATUS_CODE.DUPLICATE;
                return response;
            }

            // create payload to save in DB
            const postPayload: PostData = {
                title: data.title as string,
                content: data.content as string,
                slug: slug,
                hashtag: data.hashtag ?? null,
            }

            // create a new post and add in DB
            const post = await PostRepository.createPost(db, postPayload);

            // return response with error
            if (!post) {
                response.message = "Failed to create new post";
                response.error = "Failed to create new post";
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                return response;
            }

            // set http status, data and message
            response.message = "Post created successfully!";
            response.httpStatus = HTTP_STATUS_CODE.CREATED;
            response.data = post;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while creating new posts : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

    // delete post from the database by id
    public static async deletePost(id: number) {

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

            // get the post whether it exists or not
            const postExists = await PostRepository.getPostById(db, Number(id));

            if (!postExists) {
                response.error = "Post not found";
                response.message = "Post not found";
                response.httpStatus = HTTP_STATUS_CODE.NOT_FOUND;
                return response;
            }

            // deletes a post by id
            const deletedPost = await PostRepository.deletePost(db, Number(id));

            // check if post is not deleted
            if (!deletedPost) {
                response.error = "Failed to delete post";
                response.message = "Failed to delete post";
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                return response;
            }

            // set http status, data and message
            response.message = "Post deleted successfully!";
            response.httpStatus = HTTP_STATUS_CODE.OK;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while deleting post : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

    // updates post in the database
    public static async updatePost(req: NextRequest, id: number) {

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
            const isValid = validatePost(data);

            // return on invalid payload
            if (isValid.error) {
                response.message = isValid.msg;
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                response.error = isValid.msg;
                return response;
            }

            // create slug if not found in payload
            const slug = data.slug ?? createSlug(data.title as string);

            // get the post whether it exists or not
            const postExists = await PostRepository.getPostById(db, Number(id));

            if (!postExists) {
                response.error = "Post not found";
                response.message = "Post not found";
                response.httpStatus = HTTP_STATUS_CODE.NOT_FOUND;
                return response;
            }

            // create payload to save in DB
            const postPayload: PostData = {
                title: data.title as string,
                content: data.content as string,
                slug: slug,
                hashtag: data.hashtag ?? null,
            }

            // update post in DB
            const post = await PostRepository.updatePost(db, postPayload, Number(id));

            // return response with error
            if (!post) {
                response.message = "Failed to update post";
                response.error = "Failed to update post";
                response.httpStatus = HTTP_STATUS_CODE.BAD_REQUEST;
                return response;
            }

            // set http status, data and message
            response.message = "Post updated successfully!";
            response.httpStatus = HTTP_STATUS_CODE.OK;
            response.data = post;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while updating post : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

    // get post from the database by id
    public static async getPostById(id: number) {

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

            // deletes a post by id
            const post = await PostRepository.getPostById(db, Number(id));

            // check if post found
            if (!post) {
                response.error = "Post not found";
                response.message = "Post not found";
                response.httpStatus = HTTP_STATUS_CODE.NOT_FOUND;
                return response;
            }

            // set http status, data and message
            response.message = "Post fetched successfully!";
            response.httpStatus = HTTP_STATUS_CODE.OK;
            response.data = post;

            // return the response
            return response;

        } catch (error) {
            console.log("Error while fetching post : ", error);
            response.error = error;
            response.message = "Internal Server Error";
            response.httpStatus = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return response;
        }

    }

}