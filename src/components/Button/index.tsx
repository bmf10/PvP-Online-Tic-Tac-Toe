import { FC, ReactNode } from "react"

interface Props {
  readonly children: ReactNode
  readonly color?: "primary" | "secondary"
  readonly href?: string
  readonly className?: string
  readonly onClick?: () => void
}

const Button: FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${
        props.color === "primary"
          ? "bg-black text-white"
          : "bg-white text-black"
      } px-4 py-2 -skew-x-3 hover:skew-x-0 ${
        props.className ? props.className : ""
      }`}
      style={{ boxShadow: "3px 3px 0px 1px rgba(0,0,0,0.4)" }}
    >
      {props.children}
    </button>
  )
}

Button.defaultProps = {
  color: "primary",
}

export default Button
