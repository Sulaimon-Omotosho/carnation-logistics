'use client'

// import { createAction } from '@/lib/action'

import { startTransition, SyntheticEvent, useState } from 'react'
// import Form from 'next/form'

import SubmitButton from '@/components/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import RoleMenu from '@/components/dashboard/RoleMenu'
import CreateUserForm from '@/components/form/CreateUserForm'

const NewUserPage = () => {
  const [state, setState] = useState('ready')

  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === 'pending') {
      event.preventDefault()
      return
    }
    setState('pending')
  }

  return (
    <main className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] px-4 md:px-10 lg:px-36 pt-10 overflow-scroll remove-scrollbar'>
      <div className='w-full'>
        <div className='flex justify-between mb-6'>
          <h1 className='text-3xl font-bold'>Create User</h1>
        </div>
        {/* 
        <form
          action=''
          onSubmit={handleOnSubmit}
          className='grid gap-4 max-w-xs'
        >
          <div className=''>
            <Label htmlFor='name' className='block mb-2 font-semibold text-sm'>
              Name
            </Label>
            <Input id='name' name='name' type='text' />
          </div>
          <div className=''>
            <Label htmlFor='phone' className='block mb-2 font-semibold text-sm'>
              Phone
            </Label>
            <Input id='phone' name='phone' type='text' />
          </div>
          <div className=''>
            <Label htmlFor='email' className='block mb-2 font-semibold text-sm'>
              Email
            </Label>
            <Input id='email' name='email' type='email' />
          </div>
          <div className=''>
            <Label
              htmlFor='position'
              className='block mb-2 font-semibold text-sm'
            >
              Position
            </Label>
            <Input id='position' name='position' type='text' />
          </div>
          <div className=''>
            <Label htmlFor='role' className='block mb-2 font-semibold text-sm'>
              Role
            </Label>
            <RoleMenu />
          </div>
          <div className=''>
            <Label htmlFor='notes' className='block mb-2 font-semibold text-sm'>
              Notes
            </Label>
            <Textarea id='notes' name='notes' />
          </div>
          <div className='pb-5'>
            <SubmitButton />
          </div>
        </form> */}
        <CreateUserForm />
      </div>
    </main>
  )
}

export default NewUserPage
