import Square from "@/components/Square"
import Head from "next/head"
import getPlayerId from "@/helpers/player"
import { Game } from "@/types"
import { useEffect, useState } from "react"
import Button from "@/components/Button"
import Loading from "@/components/Loading"
import { toast } from "react-hot-toast"
import { useSocket } from "@/context/Socket"

const Home = () => {
  const { socket } = useSocket()
  const [connect, setConnect] = useState<boolean>()
  const [playerId, setPlayerId] = useState<string>()
  const [game, setGame] = useState<Game>()

  const handleOnClick = (index: number) => {
    if (game?.turnId === playerId) {
      if (typeof game?.items[index] !== "string") {
        const data = {
          index,
          playerId,
          gameId: game?._id,
        }

        socket.emit("action", data)
      }
    }
  }

  const handleLeave = () => {
    if (game && game.status == "waiting") {
      socket.emit("remove", { gameId: game._id })
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
      setConnect(true)
    })

    socket.on("disconnect", () => {
      setConnect(false)
    })

    socket.on("game", (game) => {
      setGame(game)
    })

    socket.on("connect_error", (err) => {
      toast(`Connection error due to ${err.message}`, {
        position: "top-right",
      })
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("game")
      socket.off("connect_error")
    }
  }, [socket])

  useEffect(() => {
    if (game?.winnerId) {
      if (game.winnerId === playerId) {
        toast.success("You Win")

        if (!game.items.every((v) => typeof v === "string")) {
          toast.success("Opponent Disconnected")
        }
      } else {
        toast.error("You Lose")
      }
    }
  }, [game?.items, game?.winnerId, playerId])

  const handleFindGame = () => {
    const playerId = getPlayerId()
    setPlayerId(playerId)

    socket.emit("play", playerId)
  }

  return (
    <>
      <Head>
        <title>Tic Tac Toe Online</title>
      </Head>
      <Loading
        isLoading={game?.status === "waiting"}
        text="Looking for an opponent..."
        extra={
          <Button color="secondary" className="mt-10" onClick={handleLeave}>
            Cancel
          </Button>
        }
      >
        <div className="min-h-screen bg-yellow-400 w-full flex justify-center items-center flex-col relative">
          <h1 className="font-semibold text-4xl mb-4">
            Tic <span className="text-white hover:text-red-700">Tac</span> Toe
          </h1>
          <div className="relative mt-16">
            <div
              className={`flex flex-row flex-wrap w-[10.5rem] border border-black box-content ${
                !game || game.status === "finished" ? "blur-sm" : ""
              }`}
            >
              {game
                ? game.items.map((v, i) => (
                    <Square
                      key={i}
                      value={v}
                      onClick={() => handleOnClick(i)}
                    />
                  ))
                : Array.from({ length: 9 }).map((_, i) => <Square key={i} />)}
            </div>

            {!game || game.status === "finished" ? (
              <Button
                disabled={!connect}
                color="primary"
                onClick={handleFindGame}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 z-10"
              >
                Find Game
              </Button>
            ) : undefined}
          </div>
          {game && game.status === "playing" ? (
            <p className="mt-6">
              {game?.turnId === playerId ? "Your Turn" : "Opponent Turn"}
            </p>
          ) : undefined}

          <div
            className={`absolute bottom-0 right-0 text-xs p-1 ${
              typeof connect === "undefined"
                ? "bg-orange-500"
                : connect
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {typeof connect === "undefined"
              ? "Connecting..."
              : connect
              ? "Connected"
              : "Disconnected"}
          </div>
        </div>
      </Loading>
    </>
  )
}

export default Home
