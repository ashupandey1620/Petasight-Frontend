export function getColor(type: string, sentiment: string, msg: string) {
  if (type === "deadline") {
    const hours = parseInt(msg.match(/\d+/)?.[0] || "0")

    if (hours >= 24) return "#2563eb" // blue
    if (hours >= 12) return "#eab308" // yellow
    return "#ea580c" // orange
  }

  if (type === "number") {
    const last2 = parseInt(msg.slice(-2))

    if (last2 === 0) return "#ffffff"
    if (last2 === 50) return "#808080"
    return "#000000"
  }

  const map: any = {
    very_sad: "#7f1d1d",
    sad: "#ef4444",
    neutral: "#a16207",
    happy: "#22c55e",
    very_happy: "#166534",
  }

  return map[sentiment] || "#ffffff"
}