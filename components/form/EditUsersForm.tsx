'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import CustomFormField from './CustomFormField'
import { FormFieldType } from '@/lib/types'
import { Form } from '../ui/form'
import { UserFormValidation } from '@/lib/validation'
import { roles } from '@/constants'
import { SelectItem } from '../ui/select'
import { Button } from '../ui/button'

// type Inputs = z.infer<typeof schema>

const EditUsersForm = ({ data }: { data?: any }) => {
  const [error, setError] = useState('')

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: '',
      password: '',
      notes: '',
    },
  })

  return (
    <Form {...form}>
      <form className='flex flex-col gap-8 max-h-[calc(100vh-56px)] overflow-scroll remove-scrollbar'>
        <h1 className='text-xl font-semibold'>Create a new Teacher</h1>
        <span className='text-xs text-gray-400 font-medium'>
          Authentication Information
        </span>

        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <div className='relative flex-1'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              label='Email'
              value={data.email}
              placeholder='Email'
              // className='w-full'
            />
            {error && (
              <p className='text-red-500 text-center absolute pl-10'>{error}</p>
            )}
          </div>
          <div className='relative flex-1'>
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              type='text'
              name='password'
              label='Password'
              placeholder='Type New Password'
            />
            {error && (
              <p className='text-red-500 text-center absolute pl-10'>{error}</p>
            )}
          </div>
        </div>

        <span className='text-xs text-gray-400 font-medium'>
          Personal Information
        </span>
        <div className=''>
          <div className='flex flex-col md:grid grid-cols-2 md:items-center md:justify-between gap-4'>
            <div className='relative'>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='name'
                label='Name'
                value={data.name}
                placeholder='Full Name'
              />
              {error && (
                <p className='text-red-500 text-center absolute pl-10'>
                  {error}
                </p>
              )}
            </div>
            <div className='relative'>
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name='phone'
                label='Phone Number'
                placeholder='Phone Number'
                value={data.phone}
              />
              {error && (
                <p className='text-red-500 text-center absolute pl-10'>
                  {error}
                </p>
              )}
            </div>
            <div className='relative'>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='address'
                label='Address'
                placeholder='Address'
                value={data.address}
              />
              {error && (
                <p className='text-red-500 text-center absolute pl-10'>
                  {error}
                </p>
              )}
            </div>
            <div className='relative'>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='position'
                label='Position'
                placeholder='Position'
                value={data.position}
              />
              {error && (
                <p className='text-red-500 text-center absolute pl-10'>
                  {error}
                </p>
              )}
            </div>
            <div className='relative'>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='role'
                label='Role'
                placeholder='Role'
                value={data.role}
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
                <p className='text-red-500 text-center absolute pl-10'>
                  {error}
                </p>
              )}
            </div>
            <div className='relative'>
              <label htmlFor='image' className='block text-sm font-medium'>
                Profile Image
              </label>
              <input
                id='image'
                type='file'
                name='image'
                // onChange={handleImageChange}
                className='block w-full text-sm border-gray-400 rounded-md'
              />
            </div>
          </div>
          <div className='relative'>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='notes'
              label='Notes'
              placeholder='Notes...'
              value={data.notes}
            />
            {error && (
              <p className='text-red-500 text-center absolute pl-10'>{error}</p>
            )}
          </div>
        </div>
        <Button className='bg-blue-400 text-white rounded-md p-2'>
          Update
        </Button>
      </form>
    </Form>
  )
}

export default EditUsersForm
