'use server'

import AuthError from 'next-auth'
import { saltAndHashPassword } from '@/utils/helper'
import { signIn } from 'next-auth/react'
// import { db } from '../db'
import { revalidatePath } from 'next/cache'
import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

// GET USER BY EMAIL
export const getUserByEmail = async (email: string) => {
  try {
    const user = db.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

// LOGIN
export const login = async (provider: string) => {
  await signIn(provider, { callbackUrl: '/redirect' })
}

// CREATE USER
export const CreateNewUser = async (formData: FormData) => {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const position = formData.get('position') as string
  const role = formData.get('role') as string
  const address = formData.get('address') as string
  const notes = formData.get('notes') as string

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: 'Email already exists' }
  }

  try {
    const hash = saltAndHashPassword(password)

    const userRole: UserRole = role as UserRole
    const newUser = await db.user.create({
      data: {
        name,
        phone,
        email,
        hashedPassword: hash,
        position,
        role: userRole,
        address,
        notes,
      },
    })

    return { success: true }
  } catch (error: any) {
    throw error
  }
}

// LOGIN IN WITH CREDENTIALS
export const loginWithCredentials = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return { error: 'User not found' }
  }

  // const passwordMatch = await bcrypt.compare(
  //   password,
  //   existingUser.hashedPassword!
  // )

  // if (!passwordMatch) {
  //   return { error: 'Invalid password' }
  // }

  const loginData = {
    email,
    password,
  }

  // try {
  //   await signIn('credentials', loginData)
  // } catch (error) {
  //   console.error(error)
  //   throw error
  // }
}
