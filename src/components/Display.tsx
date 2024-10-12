import { Card } from "@/components/Cards";

interface CategoryProps{
    title: string;
    categories: Array<string>;
}

function Categories(props: CategoryProps){
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

export default function Display() {
    return (
        <div className="w-full flex flex-col content-center justify-start items-center 
        my-4 text-left">
            <Categories title="City" categories={["Bengaluru", "Chennai", "Chandigarh",
                "Delhi", "Hyderabad", "Pune", "Mumbai", "Kochi", "Trivandrum"]}/>
            <Categories title="Genre" categories={["Comedy", "Horror", "Action", "Drama",
                "SciFi","Thriller", "Adventure", "Documentary", "Mystery",
                "History", "Animation", "Fiction", "Fantasy", "Crime", "Biography"]}/>
            <Categories title="Language" categories={["English", "Hindi", "Telugu", 
                "Kannada", "Malayalam", "Tamil", "Marathi"]}/>
            <Categories title="Age Category" categories={["U", "UA", "A"]}/>
            <Categories title="Format" categories={["2D", "3D", "4D"]}/>
        </div>
    )
}