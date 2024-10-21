'use client'

import TableComponent from '@/components/dashboard/Table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { users, usersColumns } from '@/constants'
import { Users } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CirclePlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UsersPage = () => {
  const { data: session } = useSession()
  const userId = session?.user.id

  const renderRow = (items: Users) => (
    <TableRow>
      <TableCell className=' p-0'>
        <Link
          href={`/${userId}/users/${items.userId}`}
          className='p-4 flex gap-4'
        >
          <Image
            src={items.image!}
            height={100}
            width={100}
            alt='profile image'
            className='h-12 w-12 rounded-full border-2 border-gray-400 object-cover'
          />
          <div className=''>
            <div className='font-medium'>{items.name} </div>
            <div className='hidden text-sm text-muted-foreground md:inline'>
              {items.email}
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/${userId}/users/${items.userId}`} className='block p-4'>
          {items.phone}
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/${userId}/users/${items.userId}`} className='block p-4'>
          <Badge
            className={cn('text-sm capitalize', {
              'bg-yellow-500': items.role === 'USER',
              'bg-violet-500': items.role === 'ADMIN',
              'bg-blue-600': items.role === 'SUPERVISOR',
            })}
            // variant={
            //   users.role === 'fulfilled' ? 'secondary' : 'outline'
            // }
          >
            {items.role}
          </Badge>
        </Link>
      </TableCell>
      <TableCell className='hidden md:table-cell p-0'>
        <Link href={`/${userId}/users/${items.userId}`} className='block p-4'>
          {items.position}
        </Link>
      </TableCell>
      <TableCell className='text-right p-0'>
        <Link href={`/${userId}/users/${items.userId}`} className='block p-4'>
          {items.userId}
        </Link>
      </TableCell>
    </TableRow>
  )

  return (
    <div className='relative'>
      <TableComponent
        title='Users'
        description='List of users'
        columns={usersColumns}
        renderRow={renderRow}
        data={users}
      />
      <div className='absolute top-7 right-5 md:right-12'>
        <Button className='inline-flex gap-2 text-xl' variant={'ghost'} asChild>
          <Link href={`/${userId}/users/new`}>
            <CirclePlus className='h-7 w-7' />
            <span className='hidden md:block'>Create User</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default UsersPage
