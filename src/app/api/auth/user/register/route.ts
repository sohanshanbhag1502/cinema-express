import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import UserSchema from "@/lib/models/user";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest){
    const body = await req.json();
    body.dob= new Date(body.dob);
    const validation = UserSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.errors}, {status: 400});
    }

    try{
        var user = await prisma.user.findUnique({
            where: {
                userId: validation.data.userId
            }
        });
        if(user){
            return NextResponse.json({message: "User already exists"}, 
                {status: 409});
        }
        user = await prisma.user.findFirst({
            where: {
                email: validation.data.email
            }
        });
        if(user){
            return NextResponse.json({message: "User already exists"}, 
                {status: 409});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    validation.data.passwd = await bcrypt.hash(validation.data.passwd, 10);
    validation.data.dob = new Date(validation.data.dob);
    await prisma.user.create({
        data: validation.data
    });

    return NextResponse.json({message: "User registered successfully"}, {status: 200});
}