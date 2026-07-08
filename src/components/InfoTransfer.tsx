"use client"

import { useEffect, useRef, useState } from 'react';
import { ArrayElements } from '../types/types';
import { useDeadLine } from '../hooks/useDeadLine';
import menu from "@/src/assets/images/menu/maps.png"
import Image from 'next/image';


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
        (!isDeadLine && data.instructionsTransfer.text) &&
        < div className={`btn-transfer content-end font-bold transition-all duration-500 transform rounded-[22px] fixed bottom-4 right-4 z-92
                ${openInfo ? `w-[calc(100%-32px)] delay-0` : "w-[112px] delay-150"}
                `}
            style={{ height: `${openInfo ? (heightText + 44) + "px" : "44px"}` }}
        >
            <div
                className={`absolute flex flex-col bottom-11 left-0 w-[calc(100vw-48px)] duration-500 flex p-3
                    ${openInfo ? "opacity-100 visible delay-500" : "opacity-0 invisible overflow-hidden delay-0"}`}
                ref={hTransfer}
            >
                <p className='mb-2 whitespace-pre-line'>
                    {data.instructionsTransfer.text}
                </p>
            </div>

            {data.instructionsTransfer.url &&
                <a href={data.instructionsTransfer.url} target='_blank'
                    className={`flex w-fit items-center absolute bottom-0 left-2 py-[10px] duration-500
                                  ${openInfo
                            ? "opacity-100 scale-100 visible delay-500"
                            : "absolute opacity-0 scale-95 invisible delay-0"
                        }`}
                >
                    <Image
                        src={menu}
                        alt=""
                        className='h-6 w-auto'
                    />
                    Abrir en maps
                </a>
            }

            <button
                className="relative p-3 font-bold w-[112px] h-11 flex items-end focus-visible:outline-none justify-self-end justify-center"
                onClick={() => setOpenInfo(prev => !prev)}
            >
                <p className={`text-[length:var(--psize)] w-[112px] self-center tracking-wider transition-all duration-500
                ${openInfo
                        ? "opacity-100 scale-100 visible delay-500"
                        : "absolute opacity-0 scale-95 invisible delay-0"
                    }`}
                >
                    Cerrar
                </p>

                <p className={`text-[length:var(--psize)] w-[112px] self-center tracking-wider transition-all duration-500
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