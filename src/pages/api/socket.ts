import type { NextApiResponseServerIO } from "@/types"
import type { NextApiRequest } from "next"
import type { Server as NetServer } from "http"
import { Server as ServerIO, Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import findGame from "@/services/findGame"
import action, { Args as ActionArgs } from "@/services/action"
import cancelGame from "@/services/cancelGame"
import disconnectGame from "@/services/disconnectGame"

interface Player {
  readonly playerId: string
  readonly clientId: string
}

const handler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    })

    res.socket.server.io = io
    console.log("New Socket.io server...")

    const clients: Socket<
      DefaultEventsMap,
      DefaultEventsMap,
      DefaultEventsMap,
      any
    >[] = []

    const players: Player[] = []

    io.sockets.on("connection", (socket) => {
      clients.push(socket)

      socket.on("disconnect", async () => {
        const clientIndex = clients.indexOf(socket)
        clients.splice(clientIndex, 1)

        const player = players.find((p) => p.clientId === socket.id)
        if (player) {
          const games = await disconnectGame({ playerId: player.playerId })
          games.map((game) => {
            socket.to(`${game._id}`).emit("game", game)
          })

          const playerIndex = players.findIndex(
            (v) => v.playerId === player.playerId
          )
          if (playerIndex > -1) {
            players.splice(playerIndex, 1)
          }
        }
      })

      socket.on("play", async (playerId: string) => {
        const playerIndex = players.findIndex((v) => v.playerId === playerId)
        if (playerIndex > -1) {
          players.splice(playerIndex, 1)
        }

        players.push({ playerId, clientId: socket.id })

        const game = await findGame({ playerId })
        socket.join(`${game._id}`)
        socket.emit("game", game)
        socket.to(`${game._id}`).emit("game", game)
      })

      socket.on("action", async (args: ActionArgs) => {
        const game = await action(args)
        if (game) {
          socket.emit("game", game)
          socket.to(`${game._id}`).emit("game", game)
        }
      })

      socket.on("remove", async (args) => {
        await cancelGame(args)
        socket.emit("game", undefined)
        socket.to(`${args.gameId}`).emit("game", undefined)
      })
    })
  }
  res.end()
}

export default handler
