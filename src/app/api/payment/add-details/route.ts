import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { pId, amount, method, bookId } = body;

    if (!pId || !amount || !method || !bookId) {
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    const tranId=Math.floor(100000000 + Math.random() * 900000000);

    const paymentDetails = await prisma.payment.create({
        data: {
            pId,
            amount,
            method,
            tranId,
            bookId
        }
    });

    return NextResponse.json(paymentDetails, {status: 200});
}