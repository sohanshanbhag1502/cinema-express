import { MovieCard } from "./Cards"

export default function Releases(){
    const releases = [
        "Devara",
        "Deadpool & Wolverine",
        "Kalki",
        "Furiosa",
        "Raayan",
        "Despicable Me 4"
    ]
    return (
        <div className="w-full flex flex-col content-center justify-start items-start 
        my-4 text-left pl-4">
            <h3 className="text-3xl font-extrabold">New Releases</h3>
            <div className="w-full grid grid-flow-col justify-evenly gap-9 my-4 
            overflow-x-auto p-5">
                {releases.map((ele, index)=><MovieCard id={index} genre={"Thriller"}
                age="UA" language="Multiple" format="2D" year={2024}
                title={ele} poster={ele} />)}
            </div>
        </div>
    )
}