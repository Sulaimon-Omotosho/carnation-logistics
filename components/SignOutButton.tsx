'use client'

import React from 'react'
import { Button } from './ui/button'
import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'

const SignOutButton = () => {
  const { data: session, status } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (session) {
    return (
      <Button onClick={handleSignOut} className='flex gap-2 p-1'>
        <LogOut />
        <span className='hidden lg:block'>Sign Out</span>
      </Button>
    )
  }
}

export default SignOutButton
