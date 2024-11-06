import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";
import TheaterSchema from "@/lib/models/theater";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = TheaterSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json({message: validation.error.errors}, {status: 400});
    }
    const etheater = await prisma.theater.findUnique({
        where: {
            theId: validation.data.theId
        }
    });
    if (etheater){
        return NextResponse.json({message: "Theater already exists"}, {status: 409});
    }
    const theater = await prisma.theater.create({
        data: validation.data
    });
    return NextResponse.json(theater, {status: 200});
}