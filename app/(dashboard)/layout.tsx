import Sidebar from '@/components/Sidebar'
import { Forklift } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function DasboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='h-screen flex remove-scrollbar'>
      {/* LEFT  */}
      <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] remove-scrollbar overflow-hidden '>
        <Link
          href='/'
          className='flex items-center justify-center lg:justify-start gap-2  px-5 pt-4'
        >
          <Forklift className='w-6 h-auto' />
          <span className='hidden lg:block font-bold'>CRL-Logistics</span>
        </Link>
        <Sidebar />
      </div>

      {/* RIGHT  */}
      <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] dark:bg-[#121825] overflow-scroll flex flex-col justify-center lg:px-4 remove-scrollbar'>
        {children}
      </div>
    </div>
  )
}
