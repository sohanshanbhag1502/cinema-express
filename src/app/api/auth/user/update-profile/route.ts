import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    body.dob?body.dob= new Date(body.dob):undefined;

    const userId = body.userId;
    body.userId = undefined;
    const user = await prisma.user.update({
        where: {
            userId
        },
        data:body
    });
    if(!user){
        return NextResponse.json({message: "User does not exist"}, {status: 409});
    }

    return NextResponse.json({message: "User profile updated successfully"}, {status: 200});
}