import React from 'react'
import { DataGuestAdProps } from '../types/types'

export const DataGuestAd = ({ assist, transfer, food }: DataGuestAdProps) => {
    return (
        <div className="col-span-3 grid grid-cols-3 items-center justify-items-center">
            {assist === null
                ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="yellow" d="M20 11q-.425 0-.712-.288T19 10t.288-.712T20 9t.713.288T21 10t-.288.713T20 11m0-3q-.425 0-.712-.288T19 7V4q0-.425.288-.712T20 3t.713.288T21 4v3q0 .425-.288.713T20 8M9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 6v-.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.587 1.413T15 20H3q-.825 0-1.412-.587T1 18" /></svg>
                : assist ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="green" d="m17.55 9.175l3.525-3.55q.3-.3.713-.3t.712.3t.3.713t-.3.712l-4.25 4.25q-.3.3-.7.3t-.7-.3l-2.125-2.125q-.3-.3-.3-.712t.3-.713t.7-.3t.7.3zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 6v-.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.587 1.413T15 20H3q-.825 0-1.412-.587T1 18" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="red" d="M17.4 13L16 11.6l2.075-2.1L16 7.425L17.4 6l2.1 2.1L21.575 6L23 7.425L20.9 9.5l2.1 2.1l-1.425 1.4l-2.075-2.075zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z" /></svg>
            }
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 15 15"
            >
                <>
                    <path fill={`${transfer ? "green" : "red"}`} d="M2 3c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v8c0 1-1 1-1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1H5v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c-1 0-1-1-1-1zm1.5 1c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h8c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5zM4 9c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1m7 0c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1M4 2.5c0 .28.22.5.5.5h6c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-6c-.28 0-.5.22-.5.5" />
                    {!transfer &&
                        <line
                            x1="15"
                            y1="0"
                            x2="0"
                            y2="15"
                            stroke={`${transfer ? "green" : "red"}`}
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="[stroke-dasharray:26] animate-draw-line"
                        />
                    }
                </>
            </svg>
            <p>{food !== "" ? food : "Sin peticiones"}</p>

        </div>
    )
}
