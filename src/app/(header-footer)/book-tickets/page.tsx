"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TheaterDisplay } from '@/components/Categories';
import dayjs from 'dayjs';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function BookTicketsPage(){
    const params=useSearchParams();

    const [city, setCity]=useState('Bengaluru');
    const curDate=new Date();
    const [date, setDate]=useState(curDate.toDateString());
    const cities=[
        "Bengaluru",
        "Chandigarh",
        "Chennai",
        "Delhi",
        "Hyderabad",
        "Kochi",
        "Mumbai",
        "Pune",
        "Thiruvananthapuram"
    ]

    const title=params.get('title')
    const id=params.get('id')

    return (
        <div className="w-full flex flex-col items-start content-center p-10">
            <div className='w-full flex flex-wrap items-center content-center 
            justify-between'>
                <h1 className='text-3xl font-bold'>Book Tickets For {title}</h1>
                <ul className='flex flex-wrap items-center content-center'>
                    <ThemeProvider theme={darkTheme}>
                        <li>
                            <Select
                                value={city}
                                onChange={(e:SelectChangeEvent<string>)=>
                                    {setCity(e.target.value)}}
                                sx={{
                                    borderRadius:"100px", fontSize:"1.3rem", 
                                    paddingX:"0.5rem", marginX:"1rem", marginY:"0.2rem"
                                }}
                            >
                                {cities.map((ele)=><MenuItem value={ele}
                                sx={{fontSize:"1.1rem"}}>{ele}</MenuItem>)}
                            </Select>
                        </li>
                        <li>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    defaultValue={dayjs(date)}
                                    format='DD/MM/YYYY  dddd'
                                    onChange={(e:dayjs.Dayjs|null) => 
                                        setDate(e.toDate().toDateString())}
                                    sx={{ 
                                        '& .MuiInputBase-input': { fontSize: "1.2rem"},
                                        '& .MuiSvgIcon-root': { fontSize: "2rem"}
                                    }}
                                />
                            </LocalizationProvider>
                        </li>
                    </ThemeProvider>
                </ul>
            </div>
            <div className='w-full flex flex-col items-start content-center py-10'>
                <h1 className='text-2xl font-bold'>Select Theater and Show Time</h1>
                <TheaterDisplay name="Royal Meenakshi Mall, Bannerghatta Road" 
                showtimes={["10:00 AM", "11:00 AM", "12:00 AM", "6:00 PM"]} movieId={id} 
                movieTitle={title} date={date}/>
                <TheaterDisplay name="Garuda Swagath Mall, Jayanagar" 
                showtimes={["10:00 AM", "11:00 AM", "12:00 AM", "6:00 PM"]} movieId={id} 
                movieTitle={title} date={date}/>
                <TheaterDisplay name="Galleria Mall, Yelahanka" 
                showtimes={["10:00 AM", "11:00 AM", "12:00 AM", "6:00 PM"]} movieId={id} 
                movieTitle={title} date={date}/>
                <TheaterDisplay name="Orion Mall, Dr Rajkumar Road" 
                showtimes={["10:00 AM", "11:00 AM", "12:00 AM", "6:00 PM"]} 
                movieId={id} movieTitle={title} date={date}/>
            </div>
        </div>
    )
}