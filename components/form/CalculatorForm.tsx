import { calculatorVal } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import CustomFormField from './CustomFormField'
import { FormFieldType } from '@/lib/types'
import SubmitButton from '../SubmitButton'

const CalculatorForm = () => {
  const [error, setError] = useState('')

  const form = useForm<z.infer<typeof calculatorVal>>({
    resolver: zodResolver(calculatorVal),
    defaultValues: {
      distance: 0,
      fuel: 0,
      miscellaneous: 0,
    },
  })

  const onSubmit = (data: z.infer<typeof calculatorVal>) => {
    console.log('Form data:', data)
    // Handle the form submission
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 w-full px-10 pb-4'
      >
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.NUMBER_INPUT}
            control={form.control}
            name='distance'
            label='Distance'
          />
          <p className='text-xl font-bold uppercase absolute top-10 right-3'>
            km
          </p>
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.NUMBER_INPUT}
            control={form.control}
            name='fuel'
            label='Fuel'
            className='pl-7'
          />
          <p className='text-xl font-bold uppercase absolute top-10 left-3'>
            n
          </p>
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.NUMBER_INPUT}
            control={form.control}
            name='miscellaneous'
            label='Miscellaneous'
            className='pl-7'
          />
          <p className='text-xl font-bold uppercase absolute top-10 left-3'>
            n
          </p>
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>

        <div className=''>
          <SubmitButton>Calculate</SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default CalculatorForm
