import AuthStatus from '@/components/AuthStatus'
import LoginGoogle from '@/components/LoginGoogle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home() {
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <h1 className='text-5xl font-bold'>CRL Logistics</h1>
      <Link href='/login'>
        <Button className=''>Welcome</Button>
      </Link>
      {/* <AuthStatus /> */}
    </div>
  )
}
