import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './services/AuthService';

const authRoutes = ['/login', '/register'];
const roleBasedPrivateRoutes = {
  customer: [/^\/customer/],
  provider: [/^\/provider/],
};
type USER_ROLE = keyof typeof roleBasedPrivateRoutes;

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else
      return NextResponse.redirect(
        new URL(`http://localhost:3000/login?redirectPath=${pathname}`, request.url)
      );
  }
  if (user?.role && roleBasedPrivateRoutes[user?.role as USER_ROLE]) {
    const routes = roleBasedPrivateRoutes[user?.role as USER_ROLE];
    if (routes.some(route => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL('/', request.url));
};

export const config = {
  matcher: ['/login', '/customer', '/customer/:page', '/provider', '/provider/:page'],
};
