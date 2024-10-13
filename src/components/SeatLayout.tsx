interface SeatRowProps{
    row:string;
}

interface SeatProps{
    SeatNo:number;
    booked:boolean;
}

function Seat(props: SeatProps){
    return (
        <button className={'w-11 border-white border-2 font-semibold text-2xl \
        transition-all duration-200 mx-2 '+
        (props.booked?"bg-black text-white cursor-default":
        "bg-white text-black hover:bg-black hover:text-white")}>
            {props.SeatNo}
        </button>
    )
}

function SeatRow(props: SeatRowProps){
    const seatNums=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    return (
        <div className="w-full flex items-center content-center justify-center py-3
        font-mono">
            <p className="text-2xl px-2">{props.row}</p>
            {seatNums.map((ele)=><Seat SeatNo={ele} booked={false}/>)}
        </div>
    )
}

export function SeatLayout(){
    const seatRows=["A","B","C","D","E","F","G","H"]

    localStorage.setItem("Seats", "H-1, A-10, B-20")

    return (
        <div className="w-full flex flex-col items-center content-center justify-center
        p-10">
            <div className="p-2 mb-10 mt-5 border-2 border-white text-center 
            w-full">Screen</div>
            {seatRows.map((ele)=><SeatRow row={ele} />)}
            <div className="w-full flex items-center content-center justify-center py-5">
                <button className='w-8 h-8 bg-black cursor-default
                border-2 font-semibold text-2xl transition-all duration-200 mx-2'>
                </button> 
                <p className="pr-10">Booked</p>
                <button className='w-8 h-8 bg-white cursor-default
                border-2 font-semibold text-2xl transition-all duration-200 mx-2'>
                </button> 
                <p>Available</p>
            </div>
        </div>
    )
}