import { FC } from "react"

interface Props {
  readonly width?: string
  readonly height?: string
}

const CircleIcon: FC<Props> = (props) => {
  return (
    <svg
      fill="#000000"
      width={props.width}
      height={props.height}
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>circle</title>
      <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z"></path>
    </svg>
  )
}

CircleIcon.defaultProps = {
  height: "35px",
  width: "35px",
}

export default CircleIcon
