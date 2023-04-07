import { calculateWinner, isFinished } from "@/helpers/game"
import clientPromise from "@/libs/mongodb"
import { Game, Value } from "@/types"
import { ObjectId } from "mongodb"

export interface Args {
  readonly index: number
  readonly playerId: string
  readonly gameId: string
}

const action = async (args: Args): Promise<Game | undefined> => {
  const { index, playerId, gameId } = args

  const client = await clientPromise
  const db = client.db("tictactoe")
  const collection = db.collection<Game>("games")
  const id = new ObjectId(gameId)
  const game = await collection.findOne({ _id: id })

  if (!game || game.status !== "playing") {
    return
  } else {
    const { latest, items } = game
    const next = latest === "o" ? "x" : "o"
    const array = items
    if (!array[index]) {
      array[index] = array[index] ? array[index] : next
    }

    let newData: Game = {
      ...game,
      items: array,
      latest: next as Value,
      turnId: game.players.find((v) => v !== playerId),
    }

    const winner = calculateWinner(array)
    if (winner) {
      newData = {
        ...newData,
        winnerId: next === "x" ? game.players[0] : game.players[1],
        status: "finished",
      }
    }

    if (isFinished(array)) {
      newData = {
        ...newData,
        status: "finished",
      }
    }

    await collection.updateOne({ _id: game._id }, { $set: newData })

    return newData
  }
}

export default action
