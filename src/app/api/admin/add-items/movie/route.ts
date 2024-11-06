import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import MovieSchema from "@/lib/models/movie";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = MovieSchema.safeParse(body);

    if (!validation.success){
        return NextResponse.json({error: validation.error.errors}, {status: 400});
    }

    const emovie = await prisma.movie.findUnique({
        where: {
            movieId: validation.data.movieId
        }
    });
    if (emovie){
        return NextResponse.json({message: "Movie already exists"}, {status: 409});
    }

    await prisma.movie.create({
        data: {
            movieId: validation.data.movieId,
            title: validation.data.title,
            description: validation.data.description,
            duration: validation.data.duration,
            ageRating: validation.data.ageRating,
            pubYear: validation.data.pubYear,
            rating: validation.data.rating,
            ratingCount: validation.data.ratingCount
        }
    });
    await Promise.all([prisma.movieLang.createMany({
        data: validation.data.languages.map((language) => ({
            movieId: validation.data.movieId,
            lang: language
        }))
    }), prisma.movieGenre.createMany({
        data: validation.data.genres.map((genre) => ({
            movieId: validation.data.movieId,
            genreName: genre
        }))
    }), prisma.movieCast.createMany({
        data: validation.data.casts.map((cast) => ({
            movieId: validation.data.movieId,
            castId: cast
        }))
    })])

    return NextResponse.json({message:"Movie added successfully"}, {status: 200});
}