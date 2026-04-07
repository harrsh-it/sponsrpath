"use server"

import { prisma } from "@/lib/prisma"
import bcryptjs from "bcryptjs"
import { signIn, signOut, auth } from "@/auth"
import { AuthError } from "next-auth"

export async function signOutUser() {
  await signOut({ redirectTo: "/" })
}

export async function deleteAccountAction() {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  try {
    // This will cascade delete their Organization/JobSeeker profile, JobPosts, and Accounts.
    await prisma.user.delete({
      where: { id: session.user.id }
    })
  } catch (error) {
    console.error("Failed to delete account:", error)
    throw new Error("Failed to delete account")
  }

  // Next.js redirect from Auth.js happens here, needs to be outside try-catch to work.
  await signOut({ redirectTo: "/" })
}


export async function signInWithGithub() {
  await signIn("github", { redirectTo: "/dashboard" })
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" })
}

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string || "USER"

  if (!name || !email || !password) {
    return { error: "Missing required fields" }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "User already exists with this email" }
  }

  const hashedPassword = await bcryptjs.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      }
    })

    return { success: true }
  } catch (error) {
    return { error: "Failed to create user" }
  }
}

export async function authenticateUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    // 2. If user doesn't exist, create a new account (Auto-Signup)
    if (!existingUser) {
      console.log(`Creating new account for: ${email}`)
      const hashedPassword = await bcryptjs.hash(password, 10)
      // Default name to the email prefix (e.g. "john" from "john@example.com")
      const defaultName = email.split('@')[0]
      
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: defaultName,
          role: "USER" // Default role, will be updated during onboarding
        }
      })
    }

    // 3. Proceed to sign in (for either existing or newly created user)
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password.' }
        default:
          return { error: 'Authentication failed. Please try again.' }
      }
    }
    // Re-throw if it's a redirect or other Next.js internal error
    if ((error as any).message?.includes('NEXT_REDIRECT')) {
      throw error
    }
    console.error("Auth Error:", error)
    return { error: "An unexpected error occurred." }
  }
}
