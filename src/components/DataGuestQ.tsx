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
                            <p className='whitespace-nowrap'>Pago tarjeta: <span className="font-semibold text-green-700">${(payment.filter((f) => f.pay).length * (price - coverage * price)).toLocaleString('es-ES')}</span></p>
                            <p className='whitespace-nowrap'>Pendiente: <span className="font-semibold text-amber-700">${(payment.filter((f) => !f.pay).length * (price - coverage * price)).toLocaleString('es-ES')}</span></p>
                        </div>
                    </div>
                    :
                    <div className="contents text-center">
                        <p className="text-gray-400 italic">El grupo no paga tarjeta</p>
                    </div>
            }
        </>
    )
}