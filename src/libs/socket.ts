import { io } from "socket.io-client"

const baseUrl = typeof window === "object" ? window.location.origin : ""

console.log(baseUrl)

const socket = io({
  path: "/api/socket",
  host: baseUrl,
  autoConnect: true,
})

export default socket
