import { Value } from "@/types"
import { FC, MouseEventHandler } from "react"
import TimesIcon from "../Icon/Times"
import CircleIcon from "../Icon/Circle"

interface Props {
  readonly value?: Value
  readonly onClick?: MouseEventHandler<HTMLButtonElement>
  readonly disabled?: boolean
  readonly className?: string
}

const Square: FC<Props> = (props) => {
  return (
    <button
      disabled={props.disabled}
      type="button"
      className={`w-14 h-14 bg-transparent cursor-pointer text-5xl flex justify-center items-center  border border-black font-thin ${
        props.className ? props.className : ""
      }`}
      onClick={props.onClick}
    >
      {props.value === "x" ? (
        <TimesIcon />
      ) : props.value === "o" ? (
        <CircleIcon />
      ) : undefined}
    </button>
  )
}

export default Square
