import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <h1 className='text-5xl font-bold'>CRL Logistics</h1>
      <Link href='/home'>
        <Button className=''>Welcome</Button>
      </Link>
    </div>
  )
}
