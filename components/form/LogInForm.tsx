'use client'

import { useState } from 'react'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormValidation } from '@/lib/validation'
import { z } from 'zod'
import CustomFormField from './CustomFormField'
import { FormFieldType } from '@/lib/types'
import SubmitButton from '../SubmitButton'
import { useRouter } from 'next/navigation'
import { getSession, signIn } from 'next-auth/react'

const LogInForm = () => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof LoginFormValidation>) => {
    setIsLoading(true)

    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (response?.error) {
        setError(response.error)
      } else {
        const session = await getSession()
        const userId = session?.user?.id
        router.push(`/${userId}/home`)
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 flex-1 bg-transparent overflow-scroll remove-scrollbar h-full pb-5'
      >
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='email'
            label='Email'
            placeholder='example@carnationregistrars.com'
          />
        </div>
        <div className='relative'>
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name='password'
            label='Password'
            placeholder='Password'
          />
        </div>

        <div className=''>
          <SubmitButton isLoading={isLoading}>Log In</SubmitButton>{' '}
          {error && (
            <p className='text-red-500 text-center absolute w-full'>{error}</p>
          )}
        </div>
      </form>
    </Form>
  )
}

export default LogInForm
