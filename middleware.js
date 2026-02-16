import { rewrite, next } from '@vercel/functions';

const STATIC_PATTERN = /^\/(assets|images|portfolio-slideshow|vite\.svg|favicon\.ico|.*\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?|webp|avif))(\?.*)?$/;

export const config = {
  matcher: ['/((?!_next|api).*)'],
};

export default function middleware(request) {
  const url = new URL(request.url);
  if (STATIC_PATTERN.test(url.pathname)) {
    return next();
  }
  return rewrite(new URL('/index.html', request.url));
}
