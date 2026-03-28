"use client"
import { useState } from "react"

export default function EmailGate({ onValid }: any) {
  const [email, setEmail] = useState("")

  const valid = email.endsWith("@petasight.com")

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border rounded-xl shadow-md w-[300px]">
        <input
          aria-label="email input"
          className="border p-2 w-full"
          placeholder="Enter @petasight email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={!valid}
          onClick={() => onValid(email)}
          className="mt-3 w-full bg-blue-600 text-white p-2 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  )
}