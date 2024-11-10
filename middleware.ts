import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectToDatabase } from './backend/lib/mongoose';

export async function middleware(request: NextRequest) {
  console.log(request.method)
  await connectToDatabase(); 
  return NextResponse.next();
}

// connect to database before even sending homepage back
export const config = {
  matcher: '/',
};
