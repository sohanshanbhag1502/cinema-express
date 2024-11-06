import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";
import { verify } from "@/lib/JWT";

export async function POST(req: NextRequest){
    const token = req.cookies.get("auth-token");
    const payload = await verify(token?.value, process.env.JWT_SECRET!);

    const userId = payload.userId;
    const user = await prisma.user.findFirst({
        where: {
            userId
        }
    });
    if(!user){
        return NextResponse.json({message: "User does not exist"}, {status: 409});
    }

    return NextResponse.json(user, {status: 200});
}