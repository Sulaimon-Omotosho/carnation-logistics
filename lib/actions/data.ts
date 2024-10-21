'use server'

import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../auth'
import { v4 as uuidv4 } from 'uuid'

const db = new PrismaClient()

// CREATE NEW INVOICE
export const createNewInvoice = async (data: {
  name: string
  company: string
  email: string
  phone: string
  address: string
  product: string
  date: string
  amount: string
  description: string
}) => {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user.id) {
    return { error: 'User not authenticated' }
  }

  const creatorId = session.user.id!
  const slug = `${data.name.replace(/\s+/g, '-').toLowerCase()}-${data.company
    .replace(/\s+/g, '-')
    .toLowerCase()}-${data.date}-${uuidv4()}`

  const newInvoice = await db.invoice.create({
    data: {
      slug,
      name: data.name || '',
      company: data.company || '',
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || '',
      product: data.product || '',
      date: data.date || new Date().toISOString(),
      amount: data.amount || '',
      description: data.description || '',
      creatorId: creatorId,
      // createdBy: creatorId,
    },
    include: {
      createdBy: true,
    },
  })

  redirect(`${newInvoice.id}`)

  // return { success: true }
}