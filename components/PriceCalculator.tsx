'use client'

// import { createAction } from '@/lib/action'

import { startTransition, SyntheticEvent, useState } from 'react'
// import Form from 'next/form'

import SubmitButton from '@/components/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import CalculatorForm from './form/CalculatorForm'

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
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>Price Calculator</h1>
      </div>
      <CalculatorForm />
    </div>
  )
}

export default PriceCalculator
