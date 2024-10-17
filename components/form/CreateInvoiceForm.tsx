'use client'

import React, { useState } from 'react'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createInvoice } from '@/lib/validation'
import { z } from 'zod'
import CustomFormField from './CustomFormField'
import { FormFieldType } from '@/lib/types'

const CreateInvoiceForm = () => {
  const [error, setError] = useState('')

  const form = useForm<z.infer<typeof createInvoice>>({
    resolver: zodResolver(createInvoice),
    defaultValues: {
      email: '',
      phone: '',
    },
  })

  const onSubmit = (data: z.infer<typeof createInvoice>) => {
    console.log('Form data:', data)
    // Handle the form submission
  }

  return (
    <Form {...form}>
      <form
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
            iconSrc=''
            iconAlt='phone'
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
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='amount'
            label='Amount'
            placeholder='Amount'
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
      </form>
    </Form>
  )
}

export default CreateInvoiceForm
