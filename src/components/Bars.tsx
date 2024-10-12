import Link from "next/link";

export function NavBar(){
    return (
        <nav className="w-full flex content-center items-center justify-between 
        shadow-sm shadow-white">
            <img src="/logo.png" className="p-4 w-[10%]" />
            <input className="text-xl rounded-full border-white border-2 bg-black p-2
            w-[40%] focus:border-2" id="searchfield"
            placeholder="Search for movies here..." />
            <div className="flex content-center items-center justify-between w-[40%] 
            px-[1%]">
                <Link href="/" className="text-xl font-semibold cursor-pointer
                group transition duration-300" id="homelink">
                    Home
                    <span className="block max-w-0 group-hover:max-w-full transition-all 
                    duration-[450ms] h-1 rounded-full bg-indigo-700"></span>
                </Link>
                <Link href="/about" className="text-xl font-semibold cursor-pointer
                group transition duration-300" id="aboutlink">
                    About
                    <span className="block max-w-0 group-hover:max-w-full transition-all 
                    duration-[450ms] h-1 rounded-full bg-indigo-700"></span>
                </Link>
                <Link href="/contactus" className="text-xl font-semibold cursor-pointer
                group transition duration-300" id="contactlink">
                    Contact Us
                    <span className="block max-w-0 group-hover:max-w-full transition-all 
                    duration-[450ms] h-1 rounded-full bg-indigo-700"></span>
                </Link>
                <Link href="/login" className="text-xl font-semibold cursor-pointer
                rounded-full bg-white text-black py-1 px-5 hover:bg-black 
                hover:text-white transition-all duration-150 border-white border-2">
                    Login/Register
                </Link>
            </div>
        </nav>
    )
}

export function FootBar(){
    return (
        <div className="w-full flex content-center items-center justify-evenly 
        p-5 border-white border-t-2">
            <p>&copy; Copyright {Date().substring(11,15)} Cinema Express. All Rights Reserved</p>
        </div>
    )
}