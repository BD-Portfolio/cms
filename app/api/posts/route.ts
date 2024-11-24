import { NextRequest } from "next/server";
import { PostService } from "../services/post.service";

export async function GET() {
    const response = await PostService.getAllPosts();
    return Response.json(response);
}

export async function POST(req: NextRequest) {
    const response = await PostService.createPost(req);
    return Response.json(response);
}