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
  const [totalCost, setTotalCost] = useState<string>('')

  const form = useForm<z.infer<typeof calculatorVal>>({
    resolver: zodResolver(calculatorVal),
    defaultValues: {
      // distance: ,
      // fuel: 0,
      // miscellaneous: 0,
    },
  })

  const onSubmit = (data: z.infer<typeof calculatorVal>) => {
    const { distance, fuel, miscellaneous } = data

    const calcTotalCost = (
      distance * 0.25 * fuel +
      miscellaneous
    ).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    setTotalCost(calcTotalCost)

    setError('')
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
            label='Fuel per litre'
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
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='total'
            label='Total'
            value={totalCost}
            disabled={true}
            className='pl-8 text-2xl'
          />
          <p className='text-2xl font-bold uppercase absolute top-10 left-3'>
            n
          </p>
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
      </form>
    </Form>
  )
}

export default CalculatorForm
