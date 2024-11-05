import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {screenId, theId, resolution} = body;

    const theater = await prisma.theater.findUnique({
        where: {
            theId
        }
    });
    if (!theater){
        return NextResponse.json({message: "Theater does not exist"}, {status: 404});
    }

    await prisma.screen.create({
        data: {
            screenId,
            theId,
            resolution
        }
    });

    return NextResponse.json("Added movie to the screen successfully", {status: 200});
}