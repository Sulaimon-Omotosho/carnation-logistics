'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { LoaderCircle } from 'lucide-react'

const SubmitButton = () => {
  const { pending } = useFormStatus()
  console.log(pending)

  return (
    <Button className='relative w-full font-semibold'>
      <span className={pending ? 'text-transparent' : ''}>Submit</span>
      {pending && (
        <span className='absolute text-gray-400 flex items-center justify-center w-full h-full'>
          <LoaderCircle className='animate-spin' />
        </span>
      )}
    </Button>
  )
}

export default SubmitButton
