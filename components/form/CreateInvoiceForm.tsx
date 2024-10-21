'use client'

import React, { useState } from 'react'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InvoiceFormValidation } from '@/lib/validation'
import { z } from 'zod'
import CustomFormField from './CustomFormField'
import { FormFieldType } from '@/lib/types'
import SubmitButton from '../SubmitButton'
import { createNewInvoice } from '@/lib/actions/data'

const CreateInvoiceForm = () => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof InvoiceFormValidation>>({
    resolver: zodResolver(InvoiceFormValidation),
    defaultValues: {
      email: '',
      phone: '',
      description: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof InvoiceFormValidation>) => {
    setIsLoading(true)

    const formattedData = {
      ...data,
      date:
        data.date instanceof Date ? data.date.toISOString() : String(data.date),
      amount: data.amount.toString(), // Convert number to string
    }

    try {
      const response = await createNewInvoice(formattedData)
    } catch (error) {
      console.error('Creating new invoice error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }

    // Handle the form submission
  }

  return (
    <Form {...form}>
      <form
        // action={createNewInvoice}
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 max-w-[400px] pb-10'
      >
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='name'
            label='Billing Name'
            placeholder='Full Name'
            iconSrc=''
            iconAlt='name'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='company'
            label='Billing Company'
            placeholder='Company'
            iconSrc=''
            iconAlt='company'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='email'
            label='Billing Email'
            placeholder='Email'
            iconSrc=''
            iconAlt='email'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name='phone'
            label='Billing Phone'
            placeholder='Phone'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='address'
            label='Address'
            placeholder='Delivery Address'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='product'
            label='Product'
            placeholder='From & To'
            iconSrc=''
            iconAlt='email'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='date'
            label='Delivery Date'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.NUMBER_INPUT}
            control={form.control}
            name='amount'
            label='Amount'
            iconSrc=''
            iconAlt='email'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='description'
            label='Description'
            placeholder='Description'
            iconSrc=''
            iconAlt='email'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>

        <div className=''>
          <SubmitButton isLoading={isLoading}>Create Invoice</SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default CreateInvoiceForm
