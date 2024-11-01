import { z } from 'zod';
import { AgeRating } from '@prisma/client';

const MovieSchema = z.object({
    movieId: z.string().min(5).max(5),
    title: z.string().max(255),
    description: z.string(),
    duration: z.string().min(0).max(10),
    ageRating: z.nativeEnum(AgeRating),
    pubYear: z.number().int().min(1900).max(2100),
    rating: z.number().min(0).max(5),
    ratingCount: z.number().int().min(0)
});

export default MovieSchema;
