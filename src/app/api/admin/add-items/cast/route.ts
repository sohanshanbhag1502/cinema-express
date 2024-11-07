import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import CastSchema from "@/lib/models/cast";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = CastSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json({error: validation.error.errors}, {status: 400});
    }
    try{
        var ecast = await prisma.cast.findUnique({
            where: {
                castId: validation.data.castId
            }
        });
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }
    if (ecast){
        return NextResponse.json({message: "Cast already exists"}, {status: 409});
    }

    try{
        await prisma.cast.create({
            data: validation.data
        });
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message:"Cast Created Successfully"}, 
        {status: 200});
}