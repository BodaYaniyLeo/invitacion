"use client"

import { useEffect, useState } from "react"
import { sendAdminData } from "../helpers/sendAdminData";
import { guestsObj } from "../types/types";

export const SendInv = ({ id, phone, textInvitation, slug }: { id: number, phone: number | "", textInvitation: string, slug: string }) => {

    const [animateButton, setAnimateButton] = useState<boolean>(false);
    const [newPhone, setNewPhone] = useState<number | "">(phone || "");

    useEffect(() => {
        setNewPhone(phone || "")
    }, [phone])


    return (
        <div className="flex justify-center w-full">
            {animateButton
                ? <div className={`bg-[hsl(200,5,12,1)] h-fit self-center ${animateButton ? "block" : "hidden"}`}>
                    <input type="number" placeholder="Número de contacto"
                        className="max-w-24 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
                        value={newPhone}
                        onChange={(e) => {
                            const valor = e.target.value;
                            setNewPhone(valor === "" ? "" : Number(valor));
                        }}
                    />
                </div>
                :
                <div className="flex w-full justify-end">
                    <a
                        href={`https://wa.me/${phone}?text=${encodeURIComponent(textInvitation)}%0Ahttps%3A%2F%2Fcasamientoyaniyleo.vercel.app%2F${slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="self-center p-2 rounded-full text-green-600" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                            <path fill={`${phone ? "#25d366" : "#adadad"}`}
                                d={`
                        M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01
                        m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23
                        m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28
                        `}
                            />

                        </svg>
                    </a >
                </div>

            }
            {animateButton
                ? < div className="relative">
                    <button
                        className="inline-flex p-2 rounded-full text-green-600 cursor-pointer"
                        onClick={() =>
                            sendAdminData({
                                guests: [{ id: id, phone: newPhone === "" ? null : newPhone }] as guestsObj[],
                                col: "phone",
                                setAnimateButton: setAnimateButton
                            })

                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                            <path fill="#25d366" d="M7.5 29A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3h13.843q.06 0 .118.002a.5.5 0 0 1 .118.004a4.5 4.5 0 0 1 2.946 1.312l3.157 3.157A4.5 4.5 0 0 1 29 10.657V24.5a4.5 4.5 0 0 1-4.5 4.5zm0-25A3.5 3.5 0 0 0 4 7.5v17a3.5 3.5 0 0 0 3 3.465V18.5A2.5 2.5 0 0 1 9.5 16h13a2.5 2.5 0 0 1 2.5 2.5v9.465a3.5 3.5 0 0 0 3-3.465V10.657a3.5 3.5 0 0 0-1.025-2.475l-3.157-3.157A3.5 3.5 0 0 0 22 4.062V9.5a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 9 9.5V4zM24 28v-9.5a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 8 18.5V28zM21 4H10v5.5a1.5 1.5 0 0 0 1.5 1.5h8A1.5 1.5 0 0 0 21 9.5z" />
                        </svg>
                    </button>
                </div>
                : < div className="relative">
                    <button
                        className="inline-flex p-2 rounded-full text-green-600 cursor-pointer"
                        onClick={() => setAnimateButton(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                            <path fill="#adadad" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" />
                        </svg>
                    </button>
                </div>
            }
        </div >

    )
}
