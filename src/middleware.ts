import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenPayload, verify } from '@/lib/JWT';

export async function middleware(req: NextRequest) {
    if (req.url.includes('/api') && req.method!=='POST') {
        return NextResponse.redirect(new URL('/not-found', req.url));
    }
    if ((req.cookies.get('auth-token') || 
    req.url.includes('/user/') || req.url.includes('/admin')) && 
    !req.url.includes('/api/auth/') && !req.url.endsWith('/admin/login')) {
        const cookie = req.cookies.get('auth-token');
        if (!cookie) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        try{
            var token: tokenPayload = await verify(cookie.value, process.env.JWT_SECRET!);
        }
        catch{
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (token.role==='user' && (req.url.endsWith('/login') || 
        req.url.endsWith('/register')) && !req.url.includes('/api/'))
            return NextResponse.redirect(new URL('/user/profile', req.url));
        else if (token.role==='admin' && req.url.endsWith('/admin/login') || 
        req.url.endsWith('/admin/register') && !req.url.includes('/api/'))
            return NextResponse.redirect(new URL('/admin', req.url));

        if (token.role==='user' && req.url.includes('/admin') && 
        !req.url.includes('/api'))
            return NextResponse.redirect(new URL('/user/profile', req.url));
        else if (token.role==='admin' && req.url.includes('/user') && 
        !req.url.includes('/api')) 
            return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.next();
}