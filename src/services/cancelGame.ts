import clientPromise from "@/libs/mongodb"
import { Game } from "@/types"
import { ObjectId } from "mongodb"

interface Args {
  readonly gameId: string
}

const cancelGame = async (args: Args) => {
  const { gameId } = args

  const client = await clientPromise
  const db = client.db("tictactoe")
  const collection = db.collection<Game>("games")
  const id = new ObjectId(gameId)

  await collection.deleteOne({ _id: id })

  return true
}

export default cancelGame
