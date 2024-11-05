import { Card, ShowTimeCard, StarCard } from "@/components/Cards";
import { Cast } from "@prisma/client";

interface CategoryProps{
    title: string;
    categories: Array<string>;
}

interface CastProps{
    stars: Array<Cast> | undefined;
}

interface TheaterProps{
    theaterId:string;
    name:string;
    showtimes:Array<string>;
    movieId: string;
    date:string;
    address:string;
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

export function CastComp(props: CastProps){
    return (
        <div className="w-full flex items-start content-center
            overflow-x-auto p-5">
            {props.stars?.map((ele)=>
                ele.role==="Actor"?<StarCard name={ele.name} designation="Actor" 
                biolink={ele.biolink} id={ele.castId}/>:<></>)
            }
        </div>
    )
}

export function Crew(props: CastProps){
    return (
        <div className="w-full flex items-start content-center
            overflow-x-auto p-5">
            {props.stars?.map((ele)=>
                ele.role!=="Actor"?<StarCard name={ele.name} designation={ele.role} 
                biolink={ele.biolink} id={ele.castId}/>:<></>)
            }
        </div>
    )
}

export function TheaterDisplay(props:TheaterProps){
    return (
        <div className="w-full flex-col items-start content-center mt-5">
            <h1 className="text-lg font-semibold">{props.name}, {props.address}</h1>
            <div className="w-full flex flex-wrap">
                {props.showtimes.map((ele)=><ShowTimeCard time={ele}
                movieId={props.movieId} theaterId={props.theaterId} 
                date={props.date}/>)}
            </div>
        </div>
    )
}