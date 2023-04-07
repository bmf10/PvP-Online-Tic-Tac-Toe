import clientPromise from "@/libs/mongodb"
import { Game } from "@/types"

interface Args {
  readonly playerId: string
}

const disconnectGame = async (args: Args) => {
  const { playerId } = args

  const client = await clientPromise
  const db = client.db("tictactoe")
  const collection = db.collection<Game>("games")

  const games = await collection
    .find({
      $and: [
        { players: { $in: [playerId] } },
        { $or: [{ status: "playing" }, { status: "waiting" }] },
      ],
    })
    .toArray()

  await Promise.all(
    games.map((game) => {
      if (game.status === "waiting") {
        return collection.deleteOne({ _id: game._id })
      }

      if (game.status === "playing") {
        return collection.updateOne(
          { _id: game._id },
          {
            $set: {
              status: "finished",
              winnerId: game.players.find((v) => v !== playerId),
            },
          }
        )
      }
    })
  )

  const ids = games.map((game) => game._id)

  return await collection.find({ _id: { $in: ids } }).toArray()
}

export default disconnectGame
