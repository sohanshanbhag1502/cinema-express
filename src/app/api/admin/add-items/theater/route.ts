import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import TheaterSchema from "@/lib/models/theater";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = TheaterSchema.safeParse(body);

    if (!validation.success){
        return NextResponse.json({error: validation.error.errors}, {status: 400});
    }

    try{
        const etheater = await prisma.theater.findUnique({
            where: {
                theId: validation.data.theId
            }
        });
        if (etheater){
            return NextResponse.json({message: "Theater already exists"}, {status: 409});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        await prisma.theater.create({
            data: validation.data
        });
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message:"Theater Created Successfully"}, {status: 200});
}