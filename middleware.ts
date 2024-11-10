import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectToDatabase } from './path/to/mongoose';

export async function middleware(request: NextRequest) {
  console.log(request.method)
  await connectToDatabase(); 
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
