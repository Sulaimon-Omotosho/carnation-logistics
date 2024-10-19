import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions)

  if (session) {
    return NextResponse.json(session)
  }

  return NextResponse.json({ message: 'Not Authenticated' }, { status: 401 })
}
