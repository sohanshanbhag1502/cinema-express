'use client'

import { useRouter } from "next/navigation";

interface CardProps {
    title: string;
    category: string;
    image: string;
}

interface MovieProps{
    id: number;
    poster: string;
    title: string;
    genre: string;
    age: string;
    language: string;
    format:string;
    year:number;
}

export function Card(props: CardProps){
    const router = useRouter();

    return (
        <div className="w-[12vw] border-white border-2 flex flex-col content-center 
        justify-start items-center p-4 transition-all duration-150 cursor-pointer
        hover:scale-110 hover:shadow-lg hover:shadow-teal-600" key={props.title}
        onClick={()=>{router.push('/search?'+props.category+'='+props.title)}}>
            <h1 className="text-xl font-medium">{props.title}</h1>
            <img alt={props.title} className="h-full object-contain"
            src={'/'+props.image+'.png'}/>
        </div>
    )
}

export function MovieCard(props:MovieProps){
    const router = useRouter();

    return (
        <div className="w-[15vw] border-white border-2 flex flex-col content-center 
        justify-start items-start p-4 transition-all duration-150 cursor-pointer
        hover:scale-105 hover:shadow-lg hover:shadow-teal-600 relative" 
        key={props.title}
        onClick={()=>{router.push('/movie?id='+props.id+'title='+props.title)}}>
            <p className="text-sm font-medium absolute left-4 bg-pink-600 
            opacity-75 top-4">
                {props.age}+
            </p>
            <p className="text-md font-medium absolute left-4 bg-pink-600 
            opacity-75 top-[15.59rem]">
                {props.year}
            </p>
            <img alt={props.title} className="w-full object-contain"
            src={'/'+props.poster+'.webp'}/>
            <h1 className="text-2xl font-medium mt-2">{props.title}</h1>
            <p className="text-lg font-medium mt-2">{props.format}</p>
            <p className="text-lg font-medium mt-2">{props.genre}</p>
            <h1 className="text-sm font-medium mt-2">Languages Available:
                {props.language}</h1>
        </div>
    )
}