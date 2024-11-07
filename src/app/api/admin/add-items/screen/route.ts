import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import ScreenSchema from "@/lib/models/screen";

export async function POST(req: NextRequest){
    const body = await req.json();

    const validation = ScreenSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json({error:validation.error.errors}, {status: 400});
    }

    try{
        const theater = await prisma.theater.findUnique({
            where: {
                theId: validation.data.theId
            }
        });
        if (!theater){
            return NextResponse.json({message: "Theater does not exist"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        await prisma.screen.create({
            data: validation.data
        });
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message:"Added movie to the screen successfully"}, 
        {status: 200});
}