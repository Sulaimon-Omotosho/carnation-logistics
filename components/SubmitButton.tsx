'use client'

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'

interface ButtonProps {
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type='submit'
      disabled={pending || isLoading}
      className={className ?? 'shad-primary-btn w-full'}
    >
      {pending || isLoading ? (
        <div className='flex items-center gap-4'>
          <LoaderCircle className=' animate-spin' />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
