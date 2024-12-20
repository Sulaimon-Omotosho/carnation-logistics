'use client'

import { z } from 'zod'

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(5, 'Name must be at least 5 characters')
    .max(50, 'Name must be at most 50 characters'),
  phone: z
    .string()
    .min(14, 'Invalid phone number')
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
  notes: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine((file) => {
      if (file) {
        return file instanceof File && file.size <= 5 * 1024 * 1024
      }
      return true
    }, 'Image file must be less than 5MB'),
})

export const LoginFormValidation = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be more than 8 characters')
    .max(20, 'Password must be less than 20 characters'),
})

export const InvoiceFormValidation = z.object({
  name: z
    .string()
    .min(5, 'Name must be at least 5 characters')
    .max(50, 'Name must be at most 50 characters'),
  company: z.string().min(5, 'Add Company name'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(14, 'Invalid phone number')
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  address: z.string().min(20, 'add delivery address'),
  from: z.string().min(3, 'Add the take-off state'),
  to: z.string().min(3, 'Add the delivery state'),
  date: z.coerce.date().refine((date) => date >= new Date(), {
    message: 'Date cannot be in the past',
  }),
  // amount: z.string().min(5, 'Add amount'),
  amount: z.preprocess(
    (value) => parseFloat(value as string),
    z
      .number({ invalid_type_error: 'Price must be a number' }) // Ensure it's a number
      .positive('Price must be a positive number') // Must be positive
      .min(0.01, 'Price must be at least 0.01')
  ), // Optional minimum price
  description: z.string().min(10, 'Description must be added'),
})

export const calculatorVal = z.object({
  distance: z.preprocess(
    (value) => parseFloat(value as string),
    z.number().min(1, 'Distance must be at least 1km')
  ),
  fuel: z.preprocess(
    (value) => parseFloat(value as string),
    z.number().min(1000, 'Price must be at least N1000')
  ),
  miscellaneous: z.preprocess(
    (value) => parseFloat(value as string),
    z
      .number()
      .min(1000, 'Price must be at least 1km')
      .positive('Price must be a positive number')
  ),
})
