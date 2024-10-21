'use server'

import { getServerSession } from 'next-auth'
import { saltAndHashPassword } from '@/utils/helper'
import { signIn } from 'next-auth/react'
import { PrismaClient, UserRole } from '@prisma/client'
import { Users } from '../types'
import { redirect } from 'next/navigation'
import { authOptions } from '../auth'

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
  await signIn(provider, { callbackUrl: '/' })
}

// CREATE USER
export const CreateNewUser = async ({ data }: { data: Users }) => {
  const session = await getServerSession(authOptions)

  if (session?.user.role !== 'ADMIN') {
    return { error: 'User not authenticated' }
  }

  const existingUser = await getUserByEmail(data.email)
  if (existingUser) {
    return { error: 'Email already exists' }
  }

  const hash = saltAndHashPassword(data.password)

  const userRole: UserRole = data.role as UserRole
  const newUser = await db.user.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      hashedPassword: hash,
      position: data.position,
      role: userRole,
      address: data.address,
      notes: data.notes,
    },
  })

  redirect(`/${session?.user.id}/users`)
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
