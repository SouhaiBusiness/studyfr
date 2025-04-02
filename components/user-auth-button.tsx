"use client"

import { useUser, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function UserAuthButton() {
  const { isSignedIn, user } = useUser()

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        <>
          {user.publicMetadata.role === "admin" && (
            <Link href="/admin/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          )}
          <UserButton afterSignOutUrl="/" />
        </>
      ) : (
        <SignInButton mode="modal">
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">Se connecter</button>
        </SignInButton>
      )}
    </div>
  )
}

