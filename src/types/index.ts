import { InferIdType } from "mongodb"
import { Server as NetServer, Socket } from "net"
import { NextApiResponse } from "next"
import { Server as SocketIOServer } from "socket.io"

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export type Value = "x" | "o"

export interface Game {
  readonly _id?: InferIdType<string>
  readonly players: string[]
  readonly status: "waiting" | "playing" | "finished"
  readonly items: Value[]
  readonly turnId?: string
  readonly winnerId?: string
  readonly latest?: Value
  readonly createdAt: string
}
