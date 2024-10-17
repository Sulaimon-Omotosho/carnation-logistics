'use client'

// import { createAction } from '@/lib/action'

import { startTransition, SyntheticEvent, useState } from 'react'
// import Form from 'next/form'

import SubmitButton from '@/components/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const PriceCalculator = () => {
  const [state, setState] = useState('ready')

  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === 'pending') {
      event.preventDefault()
      return
    }
    setState('pending')
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex justify-between mb-6'>
        <h1 className='text-3xl font-bold'>Price Calculator</h1>
      </div>

      <form
        action=''
        onSubmit={handleOnSubmit}
        className='grid gap-4 max-w-xs w-full text-center'
      >
        <div className=''>
          <Label htmlFor='name' className='block mb-2 font-semibold text-sm'>
            Distance
          </Label>
          <Input id='name' name='name' type='text' />
        </div>
        <div className=''>
          <Label htmlFor='name' className='block mb-2 font-semibold text-sm'>
            Fuel per Litre
          </Label>
          <Input id='company' name='company' type='text' />
        </div>
        <div className=''>
          <Label htmlFor='email' className='block mb-2 font-semibold text-sm'>
            Miscellaneous
          </Label>
          <Input id='email' name='email' type='email' />
        </div>
        {/* <div className=''>
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
        </div> */}
        <div className=''>
          <SubmitButton />
        </div>
        <div className=''>
          <Label htmlFor='email' className='block mb-2 font-semibold text-sm'>
            Total
          </Label>
          <Input id='email' name='email' type='email' />
        </div>
      </form>
    </div>
  )
}

export default PriceCalculator
