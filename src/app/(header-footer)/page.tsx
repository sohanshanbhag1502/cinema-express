import Carousel from "@/components/Carousel"
import Display from "@/components/Display"
import {Releases} from "@/components/Categories"

export default function Home() {
    const images = [
        "/image1.png",
        "/image2.png",
        "/image3.png"
    ]
    return (
        <div className="w-full flex flex-col content-center justify-center 
        items-center my-4 py-4">
            <Carousel images={images} />
            <Releases />
            <Display />
        </div>
    )
}
