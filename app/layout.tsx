import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Aos from '@/components/Aos';
import ScrollToTopBtn from "@/components/ScrollToTopBtn"


export const metadata = {
  title: "ETUDESFRANÇAISE - French Studies Resources",
  description: "A platform for students of French studies to access course materials, quizzes, and exams.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="font-sans">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Aos>
          <div className="flex-grow">{children}</div>
          </Aos>
      <ScrollToTopBtn />
          <Footer />
        </div>
      </body>
    </html>
    </ClerkProvider>
  )
}

