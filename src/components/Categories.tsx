import { Card, MovieCard, ShowTimeCard, StarCard } from "@/components/Cards";

interface CategoryProps{
    title: string;
    categories: Array<string>;
}

interface CastProps{
    stars: Array<string>;
}

interface TheaterProps{
    name:string;
    showtimes:Array<string>;
    movieId: string | null;
    movieTitle: string | null;
    date:string;
}

export function Categories(props: CategoryProps){
    return (
        <div className="w-full flex flex-col content-center justify-start items-start 
        my-4 text-left pl-4">
            <h3 className="text-3xl font-extrabold">Search By {props.title}</h3>
            <div className="w-full grid grid-flow-col justify-evenly gap-9 my-4 
            overflow-x-auto p-5">
                {props.categories.map((ele)=><Card title={ele} image={ele} 
                category={props.title}/>)}
            </div>
        </div>
    )
}

export function Releases(){
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
            <div className="w-full grid grid-flow-col justify-evenly gap-9 
            overflow-x-auto p-5">
                {releases.map((ele, index)=><MovieCard id={index} genre={"Thriller"}
                age="UA" language="Multiple" format="2D, 3D, 4D" year={2024}
                title={ele} poster={ele} />)}
            </div>
        </div>
    )
}

export function Cast(props: CastProps){
    return (
        <div className="w-full flex items-start content-center
            overflow-x-auto p-5">
            {props.stars.map((ele)=>
                <StarCard name={ele} designation="Actor" 
                biolink="https://en.wikipedia.org/wiki/N._T._Rama_Rao_Jr"/>)
            }
        </div>
    )
}

export function Crew(props: CastProps){
    return (
        <div className="w-full flex items-start content-center
            overflow-x-auto p-5">
            {props.stars.map((ele)=>
                <StarCard name={ele} designation="Director" 
                biolink="https://en.wikipedia.org/wiki/N._T._Rama_Rao_Jr"/>)
            }
        </div>
    )
}

export function TheaterDisplay(props:TheaterProps){
    return (
        <div className="w-full flex-col items-start content-center mt-5">
            <h1 className="text-lg font-semibold">{props.name}</h1>
            <div className="w-full flex flex-wrap">
                {props.showtimes.map((ele)=><ShowTimeCard time={ele}
                movieId={props.movieId} movieTitle={props.movieTitle} 
                theater={props.name} date={props.date}/>)}
            </div>
        </div>
    )
}