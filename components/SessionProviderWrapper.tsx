'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface SessionProviderWrapperProps {
  session: Session | null
  children: ReactNode
}

const SessionProviderWrapper: React.FC<SessionProviderWrapperProps> = ({
  session,
  children,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default SessionProviderWrapper
