import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from '@/lib/JWT';
import type { JWTPayload } from 'jose';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
    if (req.url.includes('/api')) {
        const cookieStore=cookies();
        if (req.url.includes('/auth')){
            return NextResponse.next();
        }
        else{
            const cookie= req.cookies.get('auth-token');
            var token: JWTPayload | string;
            try{
                token=await verify(cookie?.value!, process.env.JWT_SECRET!);
            }
            catch (error){
                console.log(error);
                return NextResponse.redirect(new URL('/login', req.url));
            }
            if (token){
                return NextResponse.next();
            }
            else{
                cookieStore.delete('auth-token');
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
    }
    else{
        return NextResponse.next();
    }
}