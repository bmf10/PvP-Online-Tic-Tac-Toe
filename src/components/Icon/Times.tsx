import { FC } from "react"

interface Props {
  readonly width?: string
  readonly height?: string
}

const TimesIcon: FC<Props> = (props) => {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Menu / Close_MD">
        <path
          id="Vector"
          d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

TimesIcon.defaultProps = {
  height: "50px",
  width: "50px",
}

export default TimesIcon
