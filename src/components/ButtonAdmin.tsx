"use client"
import { useState } from 'react'

interface ButtonAdminProps {
    action: (params: {
        setTextButton: (t: string) => void;
        setAnimateButton: (b: boolean) => void;
    }) => Promise<void> | void;
    text: string;
}

export const ButtonAdmin = ({ action, text }: ButtonAdminProps) => {
    const [animateButton, setAnimateButton] = useState(false)
    const [textButton, setTextButton] = useState(text)

    return (
        <button
            className="btn-send rounded-lg p-3 font-bold uppercase transition-all duration-500 transform min-w-[130px] w-fit"
            onClick={() => action({ setTextButton, setAnimateButton })}
        >
            <p className={`${animateButton ? "opacity-0" : "opacity-100"} duration-500 justify-center font-[family-name:var(--fontNormal)] flex items-center gap-2`}>
                {textButton}
            </p>
        </button>
    )
}