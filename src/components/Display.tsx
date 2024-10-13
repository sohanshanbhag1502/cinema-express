import { Categories } from "@/components/Categories"

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