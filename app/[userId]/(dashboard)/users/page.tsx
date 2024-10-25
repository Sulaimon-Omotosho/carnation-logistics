'use client'

import TableComponent from '@/components/dashboard/Table'
import Search from '@/components/Search'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { usersColumns } from '@/constants'
import { getAllUsers } from '@/lib/actions/data'
import { Users } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CirclePlus, CircleUserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const UsersPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { data: session } = useSession()
  const userId = session?.user.id

  const search: any = searchParams.search || ''

  const [users, setUsers] = useState<Users[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers: Users[] = await getAllUsers(search)
        setUsers(fetchedUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [search])

  const renderRow = (items: Users) => (
    <TableRow>
      <TableCell className=' p-0'>
        <Link href={`/${userId}/users/${items.id}`} className='p-4 flex gap-4'>
          {items.image && typeof items.image === 'string' ? (
            <Image
              src={items.image}
              width={100}
              height={100}
              alt='Profile Image'
              className='w-7 lg:w-10 h-7 lg:h-10 rounded-full object-fit border-2 border-gray-400'
            />
          ) : (
            <CircleUserRound className='w-7 h-7 lg:w-10 lg:h-10' />
          )}
          <div className=''>
            <div className='font-medium'>{items.name} </div>
            <div className='hidden text-sm text-muted-foreground md:inline'>
              {items.email}
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/${userId}/users/${items.id}`} className='block p-4'>
          {items.phone}
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/${userId}/users/${items.id}`} className='block p-4'>
          <Badge
            className={cn('text-sm capitalize', {
              'bg-yellow-500': items.role.toLocaleUpperCase() === 'USER',
              'bg-violet-500': items.role.toLocaleUpperCase() === 'ADMIN',
              'bg-blue-600': items.role.toLocaleUpperCase() === 'SUPERVISOR',
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
        <Link href={`/${userId}/users/${items.id}`} className='block p-4'>
          {items.position}
        </Link>
      </TableCell>
      <TableCell className='text-right p-0'>
        <Link href={`/${userId}/users/${items.id}`} className='block p-4'>
          {items.id.slice(0, 7)}...
        </Link>
      </TableCell>
    </TableRow>
  )

  return (
    <div className='relative'>
      <div className='absolute w-[50%] top-8 right-[30%]'>
        <Search />
      </div>
      <TableComponent
        title='Users'
        description='List of users'
        columns={usersColumns}
        renderRow={renderRow}
        data={users}
        loading={loading}
        error={error}
      />
      <div className='absolute top-7 right-5 md:right-12'>
        {session?.user.role === 'ADMIN' ? (
          <Button
            className='inline-flex gap-2 text-xl'
            variant={'ghost'}
            asChild
          >
            <Link href={`/${userId}/users/new`}>
              <CirclePlus className='h-7 w-7' />
              <span className='hidden md:block'>Create User</span>
            </Link>
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default UsersPage
