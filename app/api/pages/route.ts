import { NextRequest } from "next/server";
import { PageService } from "../services/page.service";

export async function GET() {
    const response = await PageService.getAllPages();
    return Response.json(response);
}

export async function POST(req: NextRequest) {
    const response = await PageService.createPage(req);
    return Response.json(response);
}