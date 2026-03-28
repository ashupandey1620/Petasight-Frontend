export async function sendMessage(message: string, email: string) {
  const res = await fetch(
    "https://petasight-backend.onrender.com/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, email }),
    }
  )

  if (!res.ok) {
    throw new Error("API failed")
  }

  return res.json()
}