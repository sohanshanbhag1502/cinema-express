'use client'

import { useSearchParams } from "next/navigation";
import { FilterCard, MovieCard } from "@/components/Cards";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useEffect, useState } from "react";
import type { MovieProps } from "@/components/Cards";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import FilterMenu from "@/components/FilterMenu";
import { useRouter } from "next/navigation";

export interface Filters{
    genre:string | undefined | null,
    city:string | undefined | null,
    language:string | undefined | null,
    ageRating:string | undefined | null
}

export default function SearchPage(){
    const params=useSearchParams();
    const [movies, setMovies]=useState<MovieProps[]>([]);
    const [sortOrder, setSortOrder]=useState("");
    const [showMenu, setShowMenu]=useState<boolean>(false);
    const [filters, setFilters]=useState<Filters>({
        genre:params.get("genre"),
        city:params.get("city"),
        language:params.get("language"),
        ageRating:params.get("ageRating")
    });
    const router=useRouter();

    const filterCards=[];
    if(filters?.genre) filterCards.push(<FilterCard type="genre" 
        value={filters?.genre}/>)
    if(filters?.city) filterCards.push(<FilterCard type="city"
        value={filters?.city}/>)
    if(filters?.language) filterCards.push(<FilterCard type="language"
        value={filters?.language}/>)
    if(filters?.ageRating) filterCards.push(<FilterCard type="ageRating"
        value={filters?.ageRating}/>)

    const postSearch=async ()=>{
        const response=await fetch("/api/search",{
            method:"POST",
            body:JSON.stringify(filters),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data:MovieProps[]=await response.json();
        setMovies(data);
    }

    useEffect(()=>{
        postSearch();
        setFilters({
            genre:params.get("genre"),
            language:params.get('language'),
            city:params.get('city'),
            ageRating:params.get('ageRating')
        })
    },[params])

    useEffect(()=>{
        setShowMenu(false);
        const newQuery: Record<string, string> = {};
        if(filters?.genre) 
            newQuery['genre']=filters?.genre
        if(filters?.city) 
            newQuery['city']=filters?.city
        if(filters?.language) 
            newQuery['language']=filters?.language
        if(filters?.ageRating) 
            newQuery['ageRating']=filters?.ageRating
        router.push(`/search?${new URLSearchParams(newQuery).toString()}`);
        postSearch();
    },[filters]);

    const sortResults=()=>{
        if (sortOrder==="asc") setSortOrder("desc")
        else if (sortOrder==="") setSortOrder("asc")
        else setSortOrder("")
        setMovies([...movies].sort((a,b)=>{
            if(sortOrder==="asc") return a.title.localeCompare(b.title)
            else return b.title.localeCompare(a.title)
        }))
    }

    return (
        <div className="w-full p-10 flex flex-col items-start content-center">
            {showMenu && <FilterMenu setFilter={setFilters} filterList={filters}/>}
            <div className="w-full flex items-center content-center justify-between">
                <h1 className="text-3xl font-bold py-2">Search For Movie</h1>
                <ul className="flex items-center content-center justify-center">
                    <li>
                        <button className="flex items-center content-center text-lg bg-white
                    text-black p-2 rounded-full font-semibold hover:text-white 
                    hover:bg-black border-white border-2 transition-all duration-200
                    mx-2" onClick={()=>{setShowMenu(true)}}>
                        <span className="hidden md:inline">Add More Filters</span> 
                        <FilterAltIcon fontSize="medium"/>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center content-center text-lg 
                        bg-white text-black p-2 rounded-full font-semibold 
                        hover:text-white hover:bg-black border-white border-2 
                        transition-all duration-200 mx-2"
                        onClick={sortResults}>
                            <span className="hidden md:inline">Sort Results</span>
                            {(sortOrder==="") && <SwapVertIcon fontSize="medium"/>}
                            {(sortOrder==="asc") && <FaArrowUp fontSize="medium"/>}
                            {(sortOrder==="desc") && <FaArrowDown fontSize="medium"/>}
                        </button>
                    </li>
                </ul>
            </div>
            <div className="w-full flex flex-wrap items-center content-center">
                <h2 className="text-xl font-medium py-2">Filters: </h2>
                {filterCards}
            </div>
            <div className="w-full flex flex-wrap justify-evenly xl:p-10 xs:p-3">
                {movies.map((movie)=><MovieCard {...movie}/>)}
            </div>
        </div>
    )
}