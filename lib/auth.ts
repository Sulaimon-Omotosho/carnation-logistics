import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { saltAndHashPassword } from '@/utils/helper'

const db = new PrismaClient()

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null
        }

        const email = credentials.email as string
        // const hash = saltAndHashPassword(credentials.password)

        let user: any = await db.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          return null
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.hashedPassword
          )
          if (!isMatch) {
            throw new Error('Incorrect Password')
          }
        }

        return user
      },
    }),
  ],
  // session: {
  //   strategy: 'jwt',
  // },
  pages: {
    signIn: '/home',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
