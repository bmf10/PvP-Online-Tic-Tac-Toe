import socket from "@/libs/socket"
import { FC, ReactNode, createContext, useContext, useEffect } from "react"
import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

interface ContextValue {
  readonly socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

interface Props {
  readonly children: ReactNode
}

const SocketContext = createContext<ContextValue>({ socket: socket })

export const useSocket = (): ContextValue => {
  return useContext(SocketContext)
}

const SocketProvider: FC<Props> = (props) => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }
    return () => {
      if (socket.connected) {
        socket.disconnect()
      }
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
