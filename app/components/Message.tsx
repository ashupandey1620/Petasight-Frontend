"use client"

type Props = {
  text: string
  color?: string
  isUser?: boolean
}

export default function Message({ text, color, isUser }: Props) {
  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm">
          🤖
        </div>
      )}

      <div
        className={`max-w-[75%] p-3 rounded-2xl shadow-md text-sm leading-relaxed`}
        style={{
          background: isUser
            ? "linear-gradient(135deg, #2563eb, #1e40af)"
            : `linear-gradient(135deg, ${color || "#f3f4f6"}, #e5e7eb)`,
          color: isUser ? "#fff" : "#111",
        }}
      >
        <p className="whitespace-pre-wrap">{text}</p>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
          👤
        </div>
      )}
    </div>
  )
}