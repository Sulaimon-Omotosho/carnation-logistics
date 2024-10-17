'use client'

import React from 'react'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createInvoice } from '@/lib/validation'
import { z } from 'zod'

const CreateInvoiceForm = () => {
  const [error, setError] = useState('')

  const form = useForm<z.infer<typeof createInvoice>>({
    resolver: zodResolver(createInvoice),
    defaultValues: {
      email: '',
      phone: '',
    },
  })

  const onSubmit = (data: z.infer<typeof createUser>) => {
    console.log('Form data:', data)
    // Handle the form submission
  }

  return (
    <Form {...form}>
      <form action=''></form>
    </Form>
  )
}

export default CreateInvoiceForm
