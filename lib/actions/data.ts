'use server'

import { Prisma, PrismaClient, UserRole } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../auth'
import { v4 as uuidv4 } from 'uuid'
import { Users } from '../types'

const db = new PrismaClient()

enum status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  FULFILLED = 'FULFILLED',
  CANCELLED = 'CANCELLED',
}

// CREATE NEW INVOICE
export const createNewInvoice = async (data: {
  name: string
  company: string
  email: string
  phone: string
  address: string
  from: string
  to: string
  date: string
  amount: string
  description: string
}) => {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user.id) {
    throw new Error('You are not authenticated')
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
      email: data.email.toLowerCase() || '',
      phone: data.phone || '',
      address: data.address || '',
      from: data.from || '',
      to: data.to || '',
      date: data.date || new Date().toISOString(),
      amount: data.amount || '',
      description: data.description || '',
      creatorId: creatorId,
    },
    include: {
      createdBy: true,
    },
  })

  redirect(`${newInvoice.id}`)
}

// GET ALL INVOICES
export const getAllInvoices = async (
  offset = 0,
  limit = 10,
  search?: string
) => {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user.id) {
    throw new Error('You are not authenticated')
  }

  const whereClause = search
    ? {
        OR: [
          { company: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }
    : undefined
  try {
    const invoices = await db.invoice.findMany({
      where: whereClause as any,
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return invoices.map((invoice) => ({
      ...invoice,
      amount:
        typeof invoice.amount === 'string'
          ? parseFloat(invoice.amount)
          : invoice.amount,
    }))
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

// GET 1 INVOICE
export const getInvoice = async (invoiceId: string) => {
  const id = invoiceId
  try {
    const invoice = await db.invoice.findUnique({
      where: { id },
    })

    if (!invoice) {
      throw new Error(`Invoice with ID ${id} not found`)
    }

    return invoice
  } catch (error) {
    console.error('Error fetching invoice:', error)
  } finally {
    await db.$disconnect
  }
}

// UPDATE INVOICE STATUS
export const updateInvoice = async ({
  invoiceId,
  newStatus,
  verificationNote,
}: {
  invoiceId: string
  newStatus: string
  verificationNote?: string
}) => {
  const session = await getServerSession(authOptions)

  if (session?.user.role === 'USER') {
    return Error('You are not authorized to do this')
  }

  try {
    const invoice = await db.invoice.findUnique({
      where: { id: invoiceId },
    })

    if (!invoice) {
      return { error: 'Invoice not found' }
    }

    const updateData: any = {
      status: newStatus,
      updatedAt: new Date(),
    }

    if (newStatus === status.IN_PROGRESS) {
      updateData.paymentVerifiedBy = session?.user.id
      updateData.deliveryVerifiedBy = ''
    }

    if (newStatus === status.FULFILLED) {
      updateData.deliveryVerifiedBy = session?.user.id
      updateData.verificationNotes = verificationNote
    }

    if (newStatus === status.CANCELLED) {
      updateData.cancelledBy = session?.user.id
      updateData.verificationNotes = verificationNote
    }

    const updatedInvoice = await db.invoice.update({
      where: { id: invoiceId },
      data: updateData,
    })

    return updatedInvoice
  } catch (error) {
    console.error('Error updating invoice:', error)
    return { error: 'Failed to update invoice' }
  }
}

// GET ALL USERS
export const getAllUsers = async (search?: string): Promise<Users[]> => {
  // const roleSearch = Object.values(UserRole).includes(search as UserRole)
  //   ? { role: { equals: search as UserRole } }
  //   : {}
  const session = await getServerSession(authOptions)

  if (!session || !session?.user.id) {
    throw new Error('You are not authenticated')
  }

  const whereClause = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          // {
          //   role: {
          //     equals: search.toUpperCase() as 'USER' | 'ADMIN' | 'SUPERVISOR',
          //   },
          // },
          // roleSearch,
        ].filter(Boolean),
      }
    : undefined

  try {
    const users = await db.user.findMany({
      where: whereClause as any,
      orderBy: {
        name: 'asc',
      },
    })

    return users as any
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

// GET A USER
export const getUser = async (staffId: string): Promise<Users> => {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user.id) {
    throw new Error('You are not authenticated')
  }

  const id = staffId
  try {
    const user = await db.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new Error(`User with ID ${id} not found`)
    }

    return user as any
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  } finally {
    await db.$disconnect
  }
}

// GET ALL USER INVOICES
export const usersInvoices = async (staffId: string) => {
  const id = staffId

  const session = await getServerSession(authOptions)

  if (!session || !session?.user.id) {
    throw new Error('You are not authenticated')
  }

  try {
    const userInvoices = await db.invoice.findMany({
      where: {
        createdBy: { id },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return userInvoices.map((invoice) => ({
      ...invoice,
      amount:
        typeof invoice.amount === 'string'
          ? parseFloat(invoice.amount)
          : invoice.amount,
    }))
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await db.$disconnect
  }
}
