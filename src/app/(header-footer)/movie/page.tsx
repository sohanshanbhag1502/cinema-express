"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Rating from '@mui/material/Rating';
import { Cast, Crew } from '@/components/Categories';

export default function MoviePage(){
    const router=useRouter();
    const params=useSearchParams();

    const title=params.get('title');
    const id=params.get('id');

    return (
        <div className="w-full flex flex-col items-start content-center justify-start
        p-10">
            <div className='w-full flex items-center content-center flex-wrap'>
                <img className='w-[20%]' src={'/'+title+'.webp'}/>
                <div className='w-[80%] p-10 flex flex-col items-start content-center'>
                    <div className='w-full flex items-center content-center justify-between'>
                        <h1 className="text-4xl">{title} (2024)</h1>
                        <div>
                            <button className='p-2 bg-white text-black border-white border-2
                            font-semibold text-xl rounded-full transition-all duration-200 mx-2
                            hover:bg-black hover:text-white' onClick={()=>{router.push('/book-tickets?id='+id+'&title='+title)}}>Book Your Tickets</button>
                            <button className='p-2 bg-white text-black border-white border-2
                            font-semibold text-xl rounded-full transition-all duration-200 mx-2
                            hover:bg-black hover:text-white'>Rate this Movie</button>
                        </div>
                    </div>
                    <p className='font-medium text-lg flex content-center pt-2'>
                        <Rating name="half-rating" defaultValue={4.5} precision={0.5} 
                        readOnly/> 
                        (22K)
                    </p>
                    <p className='font-medium text-lg flex content-center pt-2'>
                        <AccessTimeIcon />&nbsp;
                        2h 58m
                    </p>
                    <p className="text-xl font-medium left-4 bg-pink-600 my-4 p-1
                    bg-opacity-60">
                        UA+
                    </p>
                    <p className='font-medium text-lg py-1'>
                        Action, Drama, Thriller
                    </p>
                    <p className='py-4 font-medium text-lg'>
                        The film`s backdrop is centered around the far and forgotten 
                        coastal lands of India.The people,or rather the villains, in the 
                        film neither fear death nor god and there is no sense of humanity 
                        among them. Devara changes this scenario in his inimitable style.
                    </p>
                    <p className='font-medium text-lg'>
                        Languages Available: Telugu, Kannada, Malayalam, Tamil, Hindi
                    </p>
                    <p className='font-medium text-lg py-1'>
                        Formats Available: 2D, 3D, 4D
                    </p>
                </div>
                <div className='w-full flex flex-col items-center content-center justify-center
                mt-10'>
                    <h2 className='w-full text-3xl font-semibold'>Film Cast</h2>
                    <Cast stars={['Junior NTR', 'Janhvi Kapoor']}/>
                </div>
                <div className='w-full flex flex-col items-center content-center justify-center
                mt-10'>
                    <h2 className='w-full text-3xl font-semibold'>Film Crew</h2>
                    <Crew stars={['Koratala Siva', 'Nandamuri Kalyan Ram']}/>
                </div>
            </div>
        </div>
    )
}