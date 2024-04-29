import NextAuth from "next-auth"
import prisma from "@/app/lib/prisma"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { signInEmailPassword } from "./actions/auth-actions"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub, 
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", placeholder: "•••••••", type: "password" }
      },
      authorize: async (credentials) => {
        const user = await signInEmailPassword(credentials.email as string, credentials.password as string)
        if(user){
          return user
        }
        return null
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  callbacks:{
    async signIn({user, account, profile, email, credentials}) {
      //return false cuando no está permitido el acceso, util cuando se quieren restringir ciertos dominios o usuarios
      return true
    },

    async jwt({user, token, account, profile}) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })
      
      // if(!dbUser?.isActive){
      //   throw Error('Usuario no está activo')
      // }

      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'


      // console.log(token)

      return token;
    },

    async session({user, token, session}) {

      if(session && session.user){
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session
    },
  }

})