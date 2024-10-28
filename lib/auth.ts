import NextAuth, { AuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaClient } from '@prisma/client'
import { JWT } from 'next-auth/jwt'
import bcrypt from 'bcryptjs'

import { saltAndHashPassword } from '@/utils/helper'

const db = new PrismaClient()

export const authOptions: AuthOptions = {
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
        const hash = saltAndHashPassword(credentials.password)

        const user: any = await db.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          throw new Error('User not found')
          // return null
        } else {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword
          )
          if (!isMatch) {
            throw new Error('Incorrect Password')
          }
        }

        return { ...user, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
