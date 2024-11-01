import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Movie, Theater } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieTitle, city, genre, ageRating, language, year} = body;
    var res1: any;
    var res2: any;
    var res3: any;
    var res4: any;
    var res5: any;
    var resId: any;
    var res: any;

    if (movieTitle) {
        res1 = await prisma.movie.findMany({
            where: {
                title: {
                    contains: movieTitle.trim()
                }
            }
        });
        res1 = res1.map((movie: Movie) => movie.movieId);
    }
    if (city) {
        res2 = await prisma.theater.findMany({
            where: {
                city
            }
        });
        res2 = res2.map((theater: Theater) => theater.theId);
        res2 = await prisma.hostMovie.findMany({
            where: {
                theId: {
                    in: res2
                }
            }
        });
        res2 = res2.map((hostMovie:Movie) => hostMovie.movieId);
    }
    if (genre) {
        res3 = await prisma.movieGenre.findMany({
            where: {
                genreName:genre
            }
        });
        res3 = res3.map((movie:Movie) => movie.movieId);
    }
    if (ageRating) {
        res4 = await prisma.movie.findMany({
            where: {
                ageRating
            }
        });
        res4 = res4.map((movie:Movie) => movie.movieId);
    }
    if (language) {
        res5 = await prisma.movieLang.findMany({
            where: {
                lang:language
            }
        });
        res5 = res5.map((movie:Movie) => movie.movieId);
    }

    if (res1){
        resId=res1.filter((movieId: string) => res2?res2.includes(movieId):true)
            .filter((movieId: string) => res3?res3.includes(movieId):true)
            .filter((movieId: string) => res4?res4.includes(movieId):true)
            .filter((movieId: string) => res5?res5.includes(movieId):true);
    }
    else if (res2){
        resId=res2.filter((movieId: string) => res3?res3.includes(movieId):true)
            .filter((movieId: string) => res4?res4.includes(movieId):true)
            .filter((movieId: string) => res5?res5.includes(movieId):true);
    }
    else if (res3){
        resId=res3.filter((movieId: string) => res4?res4.includes(movieId):true)
            .filter((movieId: string) => res5?res5.includes(movieId):true);
    }
    else if (res4){
        resId=res4.filter((movieId: string) => res5?res5.includes(movieId):true);
    }
    else if (res5){
        resId=res5;
    }

    if (resId){
        res=await prisma.movie.findMany({
            where: {
                movieId: {
                    in: resId
                }
            }
        });
    }

    return NextResponse.json(res, {status: 200});
}