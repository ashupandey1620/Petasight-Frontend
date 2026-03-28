"use client"

type Props = {
  text: string
  color: string
}

export default function Message({ text, color }: Props) {
  return (
    <div
      role="article"
      aria-live="polite"
      className="p-3 rounded-xl shadow-sm border"
      style={{
        color,
        borderColor: color,
      }}
    >
      <p className="whitespace-pre-wrap leading-relaxed">
        {text}
      </p>
    </div>
  )
}