import { NextRequest } from "next/server";
import { PageService } from "../../services/page.service";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: number }> }
) {
    const id = (await params).id;
    const response = await PageService.getPageById(id);
    return Response.json(response);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: number }> }
) {
    const id = (await params).id;
    const response = await PageService.deletePage(id);
    return Response.json(response);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: number }> }
) {
    const id = (await params).id;
    const response = await PageService.updatePage(req, id);
    return Response.json(response);
}