'use client'

import { signOut, useSession } from 'next-auth/react'
import SignOutButton from './SignOutButton'

const AuthStatus = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (session) {
    return (
      <div className='flex flex-col items-center'>
        <p>Signed in as {session.user?.email}</p>
        <p>Role is {session.user?.role} </p>
        <p>Id is {session.user?.id} </p>
        <SignOutButton />
      </div>
    )
  }
}

export default AuthStatus
