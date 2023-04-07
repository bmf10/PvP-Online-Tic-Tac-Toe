import clientPromise from "@/libs/mongodb"
import { Game } from "@/types"

interface Args {
  readonly playerId: string
}

const findGame = async (args: Args): Promise<Game> => {
  const { playerId } = args

  const client = await clientPromise
  const db = client.db("tictactoe")
  const collection = db.collection<Game>("games")
  let game = await collection.findOne({ status: "waiting" })

  if (!game) {
    const newGameData: Game = {
      players: [playerId],
      status: "waiting",
      items: Array.from({ length: 9 }),
      turnId: playerId,
      createdAt: new Date().toISOString(),
    }

    const newGame = await collection.insertOne(newGameData)
    game = await collection.findOne({ _id: newGame.insertedId })

    return game!
  } else {
    if (game.players.length > 0 && !game.players.find((v) => v === playerId)) {
      const newGameData: Game = {
        ...game,
        players: [...game.players, playerId],
        status: "playing",
        turnId: game.players[0],
        latest: "o",
      }

      await collection.updateOne({ _id: game._id }, { $set: newGameData })

      return newGameData
    } else {
      return game
    }
  }
}

export default findGame
