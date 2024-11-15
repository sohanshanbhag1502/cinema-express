import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import AdminSchema from "@/lib/models/admin";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest){
    const body = await req.json();
    body.dob= new Date(body.dob);
    const validation = AdminSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.errors}, {status: 400});
    }

    try{
        const user = await prisma.admin.findUnique({
            where: {
                adminId: validation.data.adminId
            }
        });
        if(user){
            return NextResponse.json({message: "Admin already exists"}, {status: 409});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    validation.data.passwd = await bcrypt.hash(validation.data.passwd, 10);

    try{
        await prisma.admin.create({
            data: validation.data
        });
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message:"Admin Registered Successfully"}, {status: 201});
}