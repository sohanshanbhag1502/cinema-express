'use client'

import { useSearchParams } from "next/navigation"

export default function SearchPage(){
    const params=useSearchParams();
    for(let entry of params.entries()) {
        console.log(entry[0], entry[1]);
    }
    return (
        <h1>{}</h1>
    )
}