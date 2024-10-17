'use client'

import { z } from 'zod'

export const createUser = z.object({
  name: z
    .string()
    .min(5, 'Name must be at least 5 characters')
    .max(50, 'Name must be at most 50 characters'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be more than 8 characters')
    .max(20, 'Password must be less than 20 characters'),
  position: z.string().min(3, 'Add Position'),
  role: z.enum(['ADMIN', 'SUPERVISOR', 'USER'], {
    errorMap: () => ({ message: 'You must pick a Role' }),
  }),
  address: z.string(),
})

export const createInvoice = z.object({
  name: z
    .string()
    .min(5, 'Name must be at least 5 characters')
    .max(50, 'Name must be at most 50 characters'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(20, 'add delivery address'),
  company: z.string().min(5, 'Add Company name'),
  product: z.string().min(6, 'Add delivery state to and fro'),
  date: z.string().min(5, 'Add date of delivery').date(),
  amount: z.number().min(5, 'Add amount'),
  description: z.string().min(10, 'Description must be added'),
})
