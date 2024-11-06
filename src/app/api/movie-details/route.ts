import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId} = body;

    if (!movieId){
        return NextResponse.json({message: "Movie ID is required"}, {status: 400});
    }

    const movie = await prisma.movie.findUnique({
        where: {
            movieId
        }
    });

    if (!movie){
        return NextResponse.json({message: "Movie not found"}, {status: 404});
    }

    const movieLangs = (await prisma.movieLang.findMany({
        where: {
            movieId
        }
    })).map((movie) => movie.lang);
    const movieGenres = (await prisma.movieGenre.findMany({
        where: {
            movieId
        }
    })).map((movie) => movie.genreName);
    const movieCastIds = (await prisma.movieCast.findMany({
        where: {
            movieId
        }
    })).map((movie) => movie.castId);
    const movieCasts = await prisma.cast.findMany({
        where: {
            castId: {
                in: movieCastIds
            }
        }
    });

    return NextResponse.json({movie, lang:movieLangs, casts:movieCasts,
        genres:movieGenres}, {status: 200});
}