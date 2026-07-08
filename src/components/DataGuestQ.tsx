import React from 'react'
import { DataGuestQProps, guestsObj } from '../types/types'

export const DataGuestQ = ({ guests, coverage, payment, price, groupName }: DataGuestQProps) => {
    return (
        <>
            <div className="contents">
                <p className="text-center font-medium">({guests.length})</p>
            </div>
            <div className="contents">
                <p className="text-center font-medium text-[green]">
                    ({guests.filter((f: guestsObj) => f.confirm).length})
                </p>
            </div>
            <div className="contents">
                <p className="text-center font-medium text-[red]">
                    ({guests.filter((f: guestsObj) => f.confirm === false).length})
                </p>
            </div>
            <div className="contents">
                <p className="text-center font-medium text-[yellow]">
                    ({guests.filter((f: guestsObj) => f.confirm === null).length})
                </p>
            </div>
            {
                coverage < 1
                    ?
                    <div className="contents">
                        <div className="flex gap-4 justify-center">
                            <p className='whitespace-nowrap'>Pago tarjeta: <span className="font-semibold text-green-700">${(payment.filter((f) => f.pay).length * (coverage * price)).toLocaleString('es-ES')}</span></p>
                            <p className='whitespace-nowrap'>Pendiente: <span className="font-semibold text-amber-700">${(payment.filter((f) => !f.pay).length * (coverage * price)).toLocaleString('es-ES')}</span></p>
                        </div>
                    </div>
                    :
                    <div className="contents text-center">
                        <p className="text-gray-400 italic">El grupo no paga tarjeta</p>
                    </div>
            }


            <div className="col-span-5 flex justify-between items-center px-2 py-1 rounded text-xs mt-1">

                <a className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold" target="_blank" href={`https://casamientoyaniyleo.vercel.app/${groupName}`} rel="noreferrer">
                    Ver invitación
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                        <g fill="currentColor">
                            <path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z" />
                        </g>
                    </svg>
                </a>
            </div>
        </>
    )
}