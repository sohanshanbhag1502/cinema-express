'use client'

import { useRouter } from "next/navigation";
import Link from "next/link"

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

interface StarProps{
    name: string;
    designation: string;
    biolink: string;
}

interface FilterProps{
    type: string;
    value: string;
    callbackfn: ()=>void;
}

interface ShowTimeProps{
    time: string;
    movieId:number;
    movieTitle: string;
    theater: string;
    date:string;
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
            src={'/'+props.image+'.png'} />
        </div>
    )
}

export function MovieCard(props:MovieProps){
    const router = useRouter();
    return (
        <div className="xl:w-[15vw] xs:w-full md:w-[40%] border-white border-2 flex flex-col content-center 
        justify-start items-start p-4 transition-all duration-150 cursor-pointer
        hover:scale-105 hover:shadow-lg hover:shadow-teal-600 relative my-3" 
        key={props.title}
        onClick={()=>{router.push('/movie?id='+props.id+'&title='+props.title)}}>
            <p className="text-sm font-medium absolute left-4 bg-pink-600 
            bg-opacity-60 top-4">
                {props.age}+
            </p>
            <p className="text-md font-medium absolute left-4 bg-pink-600 
            bg-opacity-60 top-[15.59rem]">
                {props.year}
            </p>
            <img alt={props.title} className="w-full object-contain"
            src={'/'+props.poster+'.webp'}/>
            <h1 className="text-2xl font-medium mt-2">{props.title}</h1>
            <p className="text-lg font-medium mt-2">{props.format}</p>
            <p className="text-lg font-medium mt-2">{props.genre}</p>
            <h1 className="text-sm font-medium mt-2">Languages Available:&nbsp;
                {props.language}
            </h1>
        </div>
    )
}

export function StarCard(props: StarProps){
    return (
        <Link href={props.biolink} className="w-[12%] mr-[5rem] cursor-pointer" 
        target="_blank">
            <div className="w-full flex flex-col items-center content-center 
            justify-center text-center">
                <img src={"/"+props.name+".png"} className="w-full rounded-full"/>
                <p className="pt-4 font-medium text-md">{props.name}</p>
                <p className="font-medium text-sm text-gray-400">
                    {props.designation}
                </p>
            </div>
        </Link>
    )
}

export function FilterCard(props: FilterProps){
    return (
        <div className="m-1 pl-3 bg-blue-700 flex items-center content-center
        justify-center rounded-lg">
            {props.type}: {props.value}
            <button className="pr-2 pl-2 text-gray-400 font-semibold">
                X
            </button>
        </div>
    )
}

export function ShowTimeCard(props: ShowTimeProps){
    return(
        <Link className="m-2 px-2 py-1 rounded-full hover:text-black 
        hover:bg-white border-2 border-white transition-all duration-200 font-medium"
        href={{
                pathname:"/select-seats", 
                query:{
                    movieId:props.movieId,
                    movieTitle:props.movieTitle,
                    time:props.time,
                    theater:props.theater,
                    date:props.date
                }
            }}>
            {props.time}
        </Link>
    )
}