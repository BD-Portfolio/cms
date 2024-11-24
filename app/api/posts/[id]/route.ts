import { PostService } from "../../services/post.service";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: number }> }
) {
    const id = (await params).id;
    const response = await PostService.getPostById(id);
    return Response.json(response);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: number }> }
) {
    const id = (await params).id;
    const response = await PostService.deletePost(id);
    return Response.json(response);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: number }> }
) {
    const id = (await params).id;
    const response = await PostService.updatePost(req, id);
    return Response.json(response);
}