import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// auth.config.ts is used by the Edge middleware (cannot use Prisma here)
export default {
  providers: [
    // Minimal credentials placeholder for Edge compatibility
    // Full credentials logic is in auth.ts
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize() {
        return null // Actual auth happens in auth.ts
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig
