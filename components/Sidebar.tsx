'use client'

import {
  ChartPie,
  CircleUserRound,
  House,
  Notebook,
  UsersRound,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'
import Image from 'next/image'
import SignOutButton from './SignOutButton'
import { useSession } from 'next-auth/react'

const Sidebar = () => {
  const { data: session } = useSession()
  const userId = session?.user.id

  return (
    <div className='pt-4 pb-20 h-full overflow-scroll remove-scrollbar px-2 lg:px-4'>
      <div className='flex flex-col gap-2 h-full'>
        <p className='hidden lg:block font-bold text-gray-400 py-4'>
          DASHBOARD
        </p>
        <div className='h-full flex flex-col justify-between'>
          <div className='flex flex-col gap-2'>
            <Link
              href={`/${userId}/home`}
              className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 dark:text-gray-400 py-2 md:px-2 rounded-md hover:bg-susuSky'
            >
              <House className='w-4 h-auto' />
              <span className='hidden lg:block'>Home</span>
            </Link>
            <Link
              href={`/${userId}/invoices`}
              className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 dark:text-gray-400 py-2 md:px-2 rounded-md hover:bg-susuSky'
            >
              <Notebook className='w-4 h-auto' />
              <span className='hidden lg:block'>Invoices</span>
            </Link>
            <Link
              href={`/${userId}/users`}
              className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 dark:text-gray-400 py-2 md:px-2 rounded-md hover:bg-susuSky'
            >
              <UsersRound className='w-4 h-auto' />
              <span className='hidden lg:block'>Users</span>
            </Link>
            {/* <Link
              href='/analytics'
              className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 dark:text-gray-400 py-2 md:px-2 rounded-md hover:bg-susuSky'
            >
              <ChartPie className='w-4 h-auto' />
              <span className='hidden lg:block'>Analytics</span>
            </Link> */}
          </div>
          <div className='flex flex-col gap-4'>
            <SignOutButton />
            <div
              // href='/profile'
              className='flex items-center justify-center lg:justify-start gap-2 text-gray-500 dark:text-gray-400 md:px-2 rounded-md hover:bg-susuSky'
            >
              {session?.user.image ? (
                <Image
                  src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
                  width={100}
                  height={100}
                  alt='Profile Image'
                  className='w-7 lg:w-10 h-7 lg:h-10 rounded-full object-fit border-2 border-gray-400'
                />
              ) : (
                <CircleUserRound className='w-10 h-10' />
              )}

              <Link
                href={`/${userId}/profile`}
                className='hidden lg:flex font-semibold flex-col p-1'
              >
                {session?.user.name}
                <span className='font-thin text-xs capitalize'>
                  {session?.user.role?.toLowerCase()}
                </span>
              </Link>
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
