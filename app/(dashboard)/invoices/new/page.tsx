'use client'

// import { createAction } from '@/lib/action'

import { startTransition, SyntheticEvent, useState } from 'react'
import FormModal from '@/components/dashboard/FormModal'
import CreateInvoiceForm from '@/components/form/CreateInvoiceForm'

const NewInvoicePage = () => {
  const [state, setState] = useState('ready')

  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === 'pending') {
      event.preventDefault()
      return
    }
    setState('pending')
  }

  return (
    <main className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] px-4 md:px-10 lg:px-36 pt-10 overflow-scroll remove-scrollbar'>
      <div className='w-full'>
        <div className='flex justify-between mb-6'>
          <h1 className='text-3xl font-bold'>Create Invoice</h1>
          <FormModal />
        </div>
        <CreateInvoiceForm />
      </div>
    </main>
  )
}

export default NewInvoicePage
