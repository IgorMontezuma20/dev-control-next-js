import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'
import prismaClient from './prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient) as any,
  providers: [
    GoogleProvider({
      clientId:"357058581474-jp7aumde2cp6pe6mbenkuetrm52epg8a.apps.googleusercontent.com",
      clientSecret: "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"
    })
  ],
  secret: "projeto123",
  callbacks: {
    async session({ session, token, user, }){
      session.user = { ...session.user, id: user.id } as {
        id: string,
        name: string;
        email: string;
      }

      return session;

    }
  }
}