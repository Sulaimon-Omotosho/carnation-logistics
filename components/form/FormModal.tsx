'use client'

import { FilePenLine, X } from 'lucide-react'
import React, { useState } from 'react'
import EditUsersForm from './EditUsersForm'

const FormModal = ({ data }: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='flex items-center justify-center rounded-full'
      >
        <FilePenLine className='w-5 h-5 text-white' />
      </button>
      {open && (
        <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center '>
          <div className='bg-white dark:bg-black p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
            {/* <Form /> */}
            <EditUsersForm data={data} />
            <div
              className='absolute top-4 right-4 cursor-pointer'
              onClick={() => setOpen(false)}
            >
              <X className='w-5 h-5' />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FormModal
