'use client'

import { useSearchParams } from "next/navigation";
import { FilterCard, MovieCard } from "@/components/Cards";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SwapVertIcon from '@mui/icons-material/SwapVert';

export default function SearchPage(){
    const params=useSearchParams();
    var arr=[]
    for(let entry of params.entries()) {
        arr.push(<FilterCard type={entry[0]} value={entry[1]} callbackfn={()=>{}}/>)
    }
    var movies=[
        "Devara",
        "Raayan",
        "Furiosa",
        "Deadpool & Wolverine",
        "Despicable Me 4"
    ]
    return (
        <div className="w-full p-10 flex flex-col items-start content-center">
            <div className="w-full flex items-center content-center justify-between">
                <h1 className="text-3xl font-bold py-2">Search For Movie</h1>
                <ul className="flex items-center content-center justify-center">
                    <li>
                        <button className="flex items-center content-center text-lg bg-white
                    text-black p-2 rounded-full font-semibold hover:text-white 
                    hover:bg-black border-white border-2 transition-all duration-200
                    mx-2">
                        <span className="hidden md:inline">Add More Filters</span> 
                        <FilterAltIcon fontSize="medium"/>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center content-center text-lg bg-white
                    text-black p-2 rounded-full font-semibold hover:text-white 
                    hover:bg-black border-white border-2 transition-all duration-200
                    mx-2">
                        <span className="hidden md:inline">Sort Results</span>
                        <SwapVertIcon fontSize="medium"/>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="w-full flex flex-wrap items-center content-center">
                <h2 className="text-xl font-medium py-2">Filters: </h2>
                {arr.map((value)=>value)}
            </div>
            <div className="w-full flex flex-wrap justify-evenly xl:p-10 xs:p-3">
                {movies.map((value, index)=><MovieCard id={index} genre={"Thriller"}
                age="UA" language="Multiple" format="2D, 3D, 4D" year={2024}
                title={value} poster={value}/>)}
            </div>
        </div>
    )
}