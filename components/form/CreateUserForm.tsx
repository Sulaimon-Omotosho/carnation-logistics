'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomFormField from './CustomFormField'
import { FormFieldType } from '@/lib/types'
import { z } from 'zod'
import { createUser } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import { roles } from '@/constants'
import { SelectItem } from '../ui/select'

const CreateUserForm = () => {
  const [error, setError] = useState('')

  const form = useForm<z.infer<typeof createUser>>({
    resolver: zodResolver(createUser),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof createUser>) => {
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
            label='Name'
            placeholder='Full Name'
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
            label='Phone Number'
            placeholder='Phone Number'
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
            name='email'
            label='Email'
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
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name='password'
            label='Password'
            placeholder='Password'
            iconSrc=''
            iconAlt='password'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='position'
            label='Position'
            placeholder='Position'
            iconSrc=''
            iconAlt='position'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>

        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name='role'
            label='Role'
            placeholder='Role'
            iconSrc=''
            iconAlt='role'
          >
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                <div className='flex cursor-pointer items-center gap-2'>
                  <p>{role.label}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
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
            placeholder='Address'
            iconSrc=''
            iconAlt='address'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='notes'
            label='Notes'
            placeholder='Notes'
            iconSrc=''
            iconAlt='notes'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>

        <div className=''>
          <SubmitButton>Create User</SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default CreateUserForm
