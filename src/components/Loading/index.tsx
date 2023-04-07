import Lottie from "lottie-react"
import loading from "./loading.json"
import * as React from "react"

interface Props {
  readonly children: React.ReactNode
  readonly isLoading?: boolean
  readonly text?: string
  readonly extra?: React.ReactNode
}

const Loading: React.FC<Props> = (props) => (
  <div className={`relative w-full h-full`}>
    {props.isLoading ? (
      <>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col justify-center items-center">
          <Lottie animationData={loading} loop />
          {props.text ? (
            <p className="text-white animate-pulse -mt-10 text-center">
              {props.text}
            </p>
          ) : undefined}
          {props.extra}
        </div>
        <div className="absolute top-0 w-full h-full left-0 z-40" />
      </>
    ) : undefined}
    <div
      className={`relative w-full h-full ${props.isLoading ? "blur-sm" : ""}`}
    >
      {props.children}
    </div>
  </div>
)

Loading.defaultProps = {
  isLoading: false,
}

export default Loading
