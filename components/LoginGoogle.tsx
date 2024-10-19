'use client'

import { login } from '@/lib/actions/auth'
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'

const LoginGoogle = () => {
  // const handleSignOut = () => {
  //   signOut({ callbackUrl: '/' })
  // }

  return (
    <div className=''>
      <Button
        onClick={() => login('google')}
        className='flex gap-4 p-4 ring-1 ring-orange-400 dark:ring-orange-200 rounded-md w-full'
      >
        <LogIn />
        <span>Use Google</span>
      </Button>
      {/* <Button onClick={handleSignOut}>sign out</Button> */}
    </div>
  )
}

export default LoginGoogle
