"use client"
import { useState } from "react"
import EmailGate from "./components/EmailGate"
import ChatBox from "./components/ChatBox"

export default function Home() {
  const [email, setEmail] = useState<string | null>(null)

  if (!email) {
    return <EmailGate onValid={setEmail} />
  }

  return <ChatBox email={email} />
}