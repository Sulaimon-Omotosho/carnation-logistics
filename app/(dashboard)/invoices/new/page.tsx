'use client'

// import { createAction } from '@/lib/action'

import { startTransition, SyntheticEvent, useState } from 'react'
// import Form from 'next/form'

import SubmitButton from '@/components/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const NewInvoicePage = () => {
  const [state, setState] = useState('ready')

  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === 'pending') {
      event.preventDefault()
      return
    }
    setState('pending')
  }

  return (
    <main className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] px-2 md:px-10 lg:px-16 pt-10'>
      <div className='flex justify-between mb-6'>
        <h1 className='text-3xl font-bold'>Create Invoice</h1>
      </div>

      <form action='' onSubmit={handleOnSubmit} className='grid gap-4 max-w-xs'>
        <div className=''>
          <Label htmlFor='name' className='block mb-2 font-semibold text-sm'>
            Billing Name
          </Label>
          <Input id='name' name='name' type='text' />
        </div>
        <div className=''>
          <Label htmlFor='name' className='block mb-2 font-semibold text-sm'>
            Billing Company
          </Label>
          <Input id='company' name='company' type='text' />
        </div>
        <div className=''>
          <Label htmlFor='email' className='block mb-2 font-semibold text-sm'>
            Billing Email
          </Label>
          <Input id='email' name='email' type='email' />
        </div>
        <div className=''>
          <Label htmlFor='email' className='block mb-2 font-semibold text-sm'>
            Billing Phone
          </Label>
          <Input id='phone' name='phone' type='text' />
        </div>
        <div className=''>
          <Label htmlFor='email' className='block mb-2 font-semibold text-sm'>
            Product
          </Label>
          <Input id='product' name='product' type='text' />
        </div>
        <div className=''>
          <Label htmlFor='value' className='block mb-2 font-semibold text-sm'>
            Amount
          </Label>
          <Input id='value' name='value' type='text' />
        </div>
        <div className=''>
          <Label
            htmlFor='description'
            className='block mb-2 font-semibold text-sm'
          >
            Description
          </Label>
          <Textarea id='description' name='description' />
        </div>
        <div className='pb-5'>
          <SubmitButton />
        </div>
      </form>
    </main>
  )
}

export default NewInvoicePage
