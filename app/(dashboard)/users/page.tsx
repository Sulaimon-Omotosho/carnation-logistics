import TableComponent from '@/components/dashboard/Table'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { users, usersColumns } from '@/constants'
import { Users } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UsersPage = () => {
  const userId = 567389

  const renderRow = (items: Users) => (
    <TableRow>
      <TableCell className=' p-0'>
        <Link href={`/users/${userId}`} className='p-4 flex gap-4'>
          <Image
            src={items.image}
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
        <Link href={`/users/${userId}`} className='block p-4'>
          {items.phone}
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/users/${userId}`} className='block p-4'>
          <Badge
            className={cn('text-sm capitalize', {
              'bg-yellow-500': items.role === 'user',
              'bg-violet-500': items.role === 'admin',
              'bg-blue-600': items.role === 'supervisor',
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
        <Link href={`/users/${userId}`} className='block p-4'>
          {items.position}
        </Link>
      </TableCell>
      <TableCell className='text-right p-0'>
        <Link href={`/users/${userId}`} className='block p-4'>
          {items.userId}
        </Link>
      </TableCell>
    </TableRow>
  )

  return (
    <div>
      <TableComponent
        title='Users'
        description='List of users'
        columns={usersColumns}
        renderRow={renderRow}
        data={users}
      />
    </div>
  )
}

export default UsersPage
