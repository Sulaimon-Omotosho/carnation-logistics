'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomFormField from './CustomFormField'
import { FormFieldType } from '@/lib/types'
import { z } from 'zod'
import { UserFormValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import { roles } from '@/constants'
import { SelectItem } from '../ui/select'
import { CreateNewUser } from '@/lib/actions/auth'

const CreateUserForm = () => {
  const [error, setError] = useState('')
  const [userError, setUserError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: '',
      password: '',
      notes: '',
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImage(file)
  }

  const uploadImageToCloudinary = async (image: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'carnation')
    formData.append('folder', 'carnation')

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dtjtev5lc/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()

    if (result.error) {
      throw new Error(result.error.message)
    }

    return result.secure_url
  }

  const onSubmit = async (data: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true)

    let imageUrl = ''
    try {
      if (image) {
        const file = image as File
        imageUrl = await uploadImageToCloudinary(file)
      }

      console.log('url;', imageUrl)

      const response = await CreateNewUser({ data, imageUrl })

      if (response?.error) {
        setUserError(response.error)
      }
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
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
            type='text'
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
          <label htmlFor='image' className='block text-sm font-medium'>
            Profile Image
          </label>
          <input
            id='image'
            type='file'
            name='image'
            onChange={handleImageChange}
            className='block w-full text-sm border-gray-400 rounded-md'
          />
        </div>

        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='notes'
            label='Notes'
            placeholder='Notes...'
          />
          {error && (
            <p className='text-red-500 text-center absolute pl-10'>{error}</p>
          )}
        </div>

        <div className=''>
          <SubmitButton isLoading={isLoading}>Create User</SubmitButton>{' '}
          {userError && (
            <p className='text-red-500 text-center pt-1'>{userError}</p>
          )}
        </div>
      </form>
    </Form>
  )
}

export default CreateUserForm
