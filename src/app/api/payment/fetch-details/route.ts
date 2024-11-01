import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { pId } = body;

    if (!pId) {
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    const bookedSeats = await prisma.payment.findMany({
        where: {
            pId
        }
    });

    return NextResponse.json(bookedSeats, {status: 200});
}