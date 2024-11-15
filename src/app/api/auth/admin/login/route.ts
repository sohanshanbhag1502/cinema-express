import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {AdminLogin} from "@/lib/models/admin";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { sign } from "@/lib/JWT";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = AdminLogin.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.errors}, {status: 400});
    }

    try{
        var admin = await prisma.admin.findUnique({
            where: {
                adminId: validation.data.adminId
            }
        });
        if (!admin){
            return NextResponse.json({message: "Admin not Registered"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    const {adminId, passwd} = admin;

    if (await bcrypt.compare(validation.data.passwd, passwd)) {
        const CookieStore=cookies();
        const token=await sign({adminId, role:"admin"}, process.env.JWT_SECRET!);
        CookieStore.set("auth-token", token, {httpOnly: true, path: "/", 
            sameSite: "strict", maxAge: 60*60*24*7});
        return NextResponse.json(admin, {status: 200});
    }
    else{
        return NextResponse.json({message: "Invalid Password"}, {status: 401});
    }
}