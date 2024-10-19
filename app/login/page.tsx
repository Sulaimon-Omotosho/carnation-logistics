import LogInForm from '@/components/form/LogInForm'
import { X } from 'lucide-react'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <main className='flex items-center justify-center w-screen h-screen bg-black bg-opacity-50'>
      <div className='bg-white py-8 w-[80%] md:w-[45%] xl:w-[25%] px-6 rounded-md shadow-lg shadow-black overflow-hidden relative'>
        <h1 className='font-bold text-center text-xl lg:text-3xl'>Log In</h1>
        <LogInForm />
        <Link href='/'>
          <X className='absolute top-3 right-3' />
        </Link>
      </div>
    </main>
  )
}

export default LoginPage
