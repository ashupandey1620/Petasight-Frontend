"use client"
import { useState } from "react"

export default function EmailGate({ onValid }: any) {
  const [email, setEmail] = useState("")

  const valid = email.endsWith("@petasight.com")

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[320px]">
        <h2 className="text-lg font-semibold mb-3 text-center">
          Enter your email
        </h2>

        <input
          className="border p-2 w-full rounded-lg"
          placeholder="name@petasight.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={!valid}
          onClick={() => onValid(email)}
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  )
}