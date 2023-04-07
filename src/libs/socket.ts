import { io } from "socket.io-client"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const socket = io({
  path: "/api/socket",
  host: baseUrl,
  autoConnect: true,
})

export default socket
