"use client"

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, PlusCircle, Settings, ChevronLeft, Menu, X } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-[#0e2d6d] text-white shadow-2xl w-64 min-h-screen fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out z-30  rounded-tr-[30px] rounded-br-[30px] 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full border-r-black-300">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="flex items-center gap-2 text-md font-bold">
              {/*<ChevronLeft className="h-5 w-5" />*/}
              <span>ETUDESFRANÇAISES</span>
            </h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 ml-2 text-red-600 cursor-pointer" />
            </button>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center gap-2 p-2 rounded-md hover:bg-white hover:text-[#0e2d6d]">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
            {/*<li>
                <Link href="/dashboard/blogs" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                  <FileText className="h-5 w-5" />
                  <span>All Blogs</span>
                </Link>
              </li>*/}
              <li>
                <Link href="/dashboard/blogs/new" className="flex items-center gap-2 p-2 rounded-md hover:bg-white hover:text-[#0e2d6d]">
                  <PlusCircle className="h-5 w-5" />
                  <span>Create Blog</span>
                </Link>
              </li>
              {/*<li>
                <Link href="/dashboard/settings" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </li>*/}
            </ul>
          </nav>
          <div className="border-t p-4">
            <div className="text-sm text-gray-500">Blog Dashboard </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 transition-all duration-200 ease-in-out">
        <header className="bg-white border-b p-4 flex items-center sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 cursor-pointer text-blue-500" />}
          </button>
          <h1 className="text-xl font-bold">Blog Dashboard</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
