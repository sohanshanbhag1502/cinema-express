import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from '@/lib/JWT';
import type { JWTPayload } from 'jose';

export async function middleware(req: NextRequest) {
    if (req.url.includes('/api')) {
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
                return NextResponse.redirect(new URL('/login', req.url));
            }
            if (token){
                return NextResponse.next();
            }
            else{
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
    }
    else if (req.url.includes('/admin') && !req.url.includes('/admin/login')){
        const cookie= req.cookies.get('auth-token');
        var token: JWTPayload | string;
        try{
            token=await verify(cookie?.value!, process.env.JWT_SECRET!);
        }
        catch (error){
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
        if (token && token.role==="admin"){
            return NextResponse.next();
        }
        else{
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }
    else{
        return NextResponse.next();
    }
}