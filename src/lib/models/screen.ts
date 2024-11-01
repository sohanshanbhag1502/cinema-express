import { z } from 'zod';

enum Resolution {
    TwoD = "2D",
    ThreeD = "3D",
    FourD = "4D"
}

const ScreenSchema = z.object({
    screenId: z.string().min(5).max(5),
    theId: z.string().min(5).max(5),
    resolution: z.nativeEnum(Resolution),
    theater: z.any(),
    bookedSeats: z.array(z.any()),
    bookings: z.array(z.any()),
    HostMovie: z.array(z.any())
});

export default ScreenSchema;