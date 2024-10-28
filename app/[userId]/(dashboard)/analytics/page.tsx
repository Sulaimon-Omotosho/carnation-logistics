import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const AnalyticsPage = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user.role !== 'ADMIN') {
    redirect('/')
  }

  return <div>AnalyticsPage</div>
}

export default AnalyticsPage
