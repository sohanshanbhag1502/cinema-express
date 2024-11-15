import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest){
    const {userId} = await req.json();

    if (!userId){
        return NextResponse.json({message: "User ID is required"}, {status: 400});
    }

    try{
        var user = await prisma.user.findUnique({
            where: {userId}
        });

        if (!user){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json(user, {status: 200});
}