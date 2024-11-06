import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { MovieGenre } from "@prisma/client";
import { MovieProps } from "@/components/Cards";

export async function POST(req: NextRequest){

    const movies = await prisma.movie.findMany({
        where: {
            pubYear: new Date().getFullYear()
        }
    });
    const movieGenres = await prisma.movieGenre.findMany({
        where: {
            movieId: {
                in: movies.map(movie => movie.movieId)
            }
        }
    });

    const movieGenresMap = movieGenres.reduce((acc: Map<string, Array<string>>, 
        movieGenre: MovieGenre) => {
        if (!acc.get(movieGenre.movieId)){
            acc.set(movieGenre.movieId, []);
        }
        acc.get(movieGenre.movieId)?.push(movieGenre.genreName);
        return acc;
    }, new Map<string, Array<string>>());

    const retMovies: MovieProps[] = [];

    movies.forEach(movie => {
        retMovies.push({
            key:movie.movieId,
            movieId: movie.movieId,
            title: movie.title,
            pubYear: movie.pubYear,
            ageRating: movie.ageRating,
            duration: movie.duration,
            genres: movieGenresMap.get(movie.movieId) || []
        });
    });

    return NextResponse.json(retMovies, {status: 200});
}