"use client"
import { useState, useRef, useEffect } from "react"
import { sendMessage } from "../lib/api"
import { getColor } from "../lib/color"
import Message from "./Message"

export default function ChatBox({ email }: { email: string }) {
  const [msg, setMsg] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dark, setDark] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSend = async () => {
    if (!msg) return

    const userMsg = msg
    setMsg("")
    setLoading(true)

    setMessages((prev) => [
      ...prev,
      { text: userMsg, isUser: true },
    ])

    try {
      const res = await sendMessage(userMsg, email)

      if (!res.response) {
        res.response = "Acknowledged"
      }

      const color = getColor(res.type, res.sentiment, userMsg)

      setMessages((prev) => [
        ...prev,
        { text: res.response, color, isUser: false },
      ])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong", color: "#ef4444" },
      ])
    }

    setLoading(false)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className={`${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex flex-col h-screen`}>
      {/* Header */}
      <div className={`p-4 flex justify-between items-center shadow ${dark ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <h1 className="font-semibold">AI Chatbot</h1>
        <button
          onClick={() => setDark(!dark)}
          className="text-sm px-3 py-1 rounded bg-gray-200"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <Message key={i} text={m.text} color={m.color} isUser={m.isUser} />
        ))}

        {/* Typing animation */}
        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
              🤖
            </div>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={`p-3 flex gap-2 border-t ${dark ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <input
          className={`flex-1 border rounded-xl p-2 ${
    dark
      ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300"
      : "bg-white text-black"
  }`}
          placeholder="Type your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  )
}