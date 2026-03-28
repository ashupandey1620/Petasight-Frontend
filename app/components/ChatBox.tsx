"use client"
import { useState } from "react"
import { sendMessage } from "../lib/api"
import { getColor } from "../lib/color"
import Message from "./Message"

export default function ChatBox({ email }: { email: string }) {
  const [msg, setMsg] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!msg) return
    setLoading(true)

    try {
      const res = await sendMessage(msg, email)
      const color = getColor(res.type, res.sentiment, msg)

      setMessages((prev) => [
        ...prev,
        { text: res.response, color },
      ])
    } catch (e) {
      console.error(e)
    }

    setMsg("")
    setLoading(false)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="space-y-2 h-[400px] overflow-y-auto border p-3">
        {messages.map((m, i) => (
        <Message key={i} text={m.text} color={m.color} />
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          aria-label="chat input"
          className="border p-2 flex-1"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  )
}