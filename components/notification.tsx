"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"

type NotificationType = "success" | "error"

interface NotificationProps {
  type: NotificationType
  message: string
  onClose: () => void
  duration?: number
}

export function Notification({ type, message, onClose, duration = 5000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-md shadow-lg ${
        type === "success"
          ? "bg-green-50 text-green-800 border border-green-200"
          : "bg-red-50 text-red-800 border border-red-200"
      }`}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 mr-2 text-red-500" />
        )}
        <p>{message}</p>
      </div>
      <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useNotification() {
  const [notification, setNotification] = useState<{
    type: NotificationType
    message: string
  } | null>(null)

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message })
  }

  const hideNotification = () => {
    setNotification(null)
  }

  return {
    notification,
    showNotification,
    hideNotification,
  }
}

