import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";
import CastSchema from "@/lib/models/cast";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = CastSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json({message: validation.error.errors}, {status: 400});
    }
    const ecast = await prisma.cast.findUnique({
        where: {
            castId: validation.data.castId
        }
    });
    if (ecast){
        return NextResponse.json({message: "Cast already exists"}, {status: 409});
    }
    const cast = await prisma.cast.create({
        data: validation.data
    });
    return NextResponse.json(cast, {status: 200});
}