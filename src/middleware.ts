import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { EnumTokens } from './services/auth/auth.service'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const refreshToken = cookies().get(EnumTokens.REFRESH_TOKEN)?.value

	const path = request.nextUrl.pathname

	if (!refreshToken && path !== '/login' && path !== '/register') {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (path === '/login' && refreshToken) {
		return NextResponse.redirect(new URL('/profile', request.url))
	}

	if (path === '/register' && refreshToken) {
		return NextResponse.redirect(new URL('/profile', request.url))
	}

	return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/profile', '/login', '/register'],
}
