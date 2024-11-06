import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {UserLogin} from "@/lib/models/user";
import prisma from "../../../../../../prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { sign } from "@/lib/JWT";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = UserLogin.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            userId: validation.data.userId
        }
    });

    if (!user){
        return NextResponse.json({message: "User not Registered"}, {status: 404});
    }

    const {userId, passwd} = user;

    if (await bcrypt.compare(validation.data.passwd, passwd)) {
        const CookieStore=cookies();
        const token=await sign({userId, role:"user"}, process.env.JWT_SECRET!);
        CookieStore.set("auth-token", token, {httpOnly: true, path: "/",
            sameSite: "strict", maxAge: 60*60*24*7});
        return NextResponse.json(user, {status: 200});
    }
    else{
        return NextResponse.json({message: "Invalid Password"}, {status: 401});
    }
}