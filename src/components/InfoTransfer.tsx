"use client"

import { useEffect, useRef, useState } from 'react';
import { ArrayElements, GuestData, guestsObj } from '../types/types';
import { useDeadLine } from '../hooks/useDeadLine';

interface MenuProps {
    data: ArrayElements;
}

export const InfoTransfer = ({ data }: MenuProps) => {

    const [openInfo, setOpenInfo] = useState<boolean>(false)
    const [heightText, setHeightText] = useState<number>(20)
    const hTransfer = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (openInfo && hTransfer.current) {
            setHeightText(hTransfer.current && hTransfer.current.clientHeight)
        }
    }, [openInfo]);

    const isDeadLine = useDeadLine()

    return (
        (isDeadLine && data.instructionsTransfer) &&
        < div className={`btn-transfer content-end font-bold transition-all duration-500 transform rounded-[22px] fixed bottom-4 right-4 z-92
                ${openInfo ? `w-[calc(100%-32px)] delay-0` : "w-[130px] delay-150"}
                `}
            style={{ height: `${openInfo ? (heightText + 44) + "px" : "44px"}` }}
        >
            <p className={`absolute bottom-11 left-0 w-[calc(100vw-48px)] duration-500 justify-center font-[family-name:var(--fontNormal)] flex items-center p-3
                    ${openInfo ? "opacity-100 visible delay-500" : "opacity-0 invisible overflow-hidden delay-0"}`}
                ref={hTransfer}
            >
                {data.instructionsTransfer}
            </p>
            <button
                className="relative p-3 font-bold uppercase w-[130px] h-11 flex items-end focus-visible:outline-none justify-self-end justify-center"
                onClick={() => setOpenInfo(prev => !prev)}
            >
                <p className={`text-sm self-center tracking-wider transition-all duration-500
                ${openInfo
                        ? "opacity-100 scale-100 visible delay-500"
                        : "absolute opacity-0 scale-95 invisible delay-0"
                    }`}
                >
                    Cerrar
                </p>

                <p className={`text-sm self-center tracking-wider transition-all duration-500
                        ${openInfo
                        ? "absolute opacity-0 scale-95 invisible delay-0"
                        : "opacity-100 scale-100 visible delay-500"
                    }`}
                >
                    Info traslado
                </p>
            </button>
        </div >

    )
}