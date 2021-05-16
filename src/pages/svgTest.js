import * as React from "react"

export default function SvgTest(props) {
    return (
        <svg
            width={48}
            height={100}
            viewBox="0 0 48 1"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <title>{"Rectangle 5"}</title>
            <path d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd" />
        </svg>
    )
}
