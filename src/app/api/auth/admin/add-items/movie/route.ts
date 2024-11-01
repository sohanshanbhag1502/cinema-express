import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import MovieSchema from "@/lib/models/movie";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = MovieSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400});
    }
    const emovie = await prisma.movie.findUnique({
        where: {
            movieId: validation.data.movieId
        }
    });
    if (emovie){
        return NextResponse.json({message: "Movie already exists"}, {status: 409});
    }
    const movie = await prisma.movie.create({
        data: validation.data
    });
    return NextResponse.json(movie, {status: 200});
}