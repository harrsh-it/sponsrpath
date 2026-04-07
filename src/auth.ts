import NextAuth from "next-auth"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "./lib/prisma"
import bcryptjs from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  // NO PrismaAdapter — we use JWT strategy and manage users manually
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user || !user.password) return null

        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For OAuth providers, upsert the user in the DB
      if (account?.provider === "github" || account?.provider === "google") {
        if (!user.email) return false
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          })
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name ?? "",
                image: user.image ?? null,
                role: "USER",
              }
            })
          }
        } catch (_) {
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      // On first sign-in (user is present), map DB user data to token
      if (user) {
        // For credentials, user is already the object returned by authorize() (DB user)
        // For OAuth, user is the provider profile - we need to find/create DB user
        if (account?.provider !== "credentials") {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { id: true, role: true }
          })
          if (dbUser) {
            token.id = dbUser.id
            token.role = dbUser.role
          }
        } else {
          token.id = user.id
          token.role = (user as any).role ?? "USER"
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
})
