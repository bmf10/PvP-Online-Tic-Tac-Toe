import SocketProvider from "@/context/Socket"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Roboto } from "next/font/google"
import { Toaster } from "react-hot-toast"

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <main className={`${roboto.variable} font-sans`}>
        <Component {...pageProps} />
        <Toaster />
      </main>
    </SocketProvider>
  )
}
