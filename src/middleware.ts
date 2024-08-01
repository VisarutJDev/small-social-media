import type { NextRequest } from 'next/server'
import { parseJwt } from './utils/parse-jwt'
import { unixToDateTime } from './utils/unixToDateTime'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  
  // now we only have 1 page that's need login
  // if more page more to handle
  if (!token && request.nextUrl.pathname == "") { 
    return Response.redirect(new URL('/login', request.url))
  }

  // if (!token && !request.nextUrl.pathname.startsWith('/signup')) { 
  //   return Response.redirect(new URL('/login', request.url))
  // }

  // if (!token && request.nextUrl.pathname.startsWith('/login')) {
  //   console.log(request.url)
  //   return Response.redirect(new URL('', request.url))
  // } 

}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}