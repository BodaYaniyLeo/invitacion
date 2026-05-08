import React from 'react'
import { guestsObj } from '@/app/page'

type statusAnswer = {
    id: number
    setDataGuest: React.Dispatch<React.SetStateAction<guestsObj[]>>
    confirm: boolean
}

export const AnswerComponent = ({
    id,
    setDataGuest,
    confirm
}: statusAnswer) => {

    const myAnwer = (newValue: boolean) => {
        setDataGuest(prev => {
            let copy = [...prev]
            let index = copy.findIndex(i => i.id === id)

            copy[index] = {
                ...copy[index],
                confirm: newValue
            }
            
            return copy
        })
    }

    return (
        <div className='flex justify-around items-center'>
            <button onClick={() => myAnwer(true)} className={`px-3 py-2 lg:px-4 lg:py-3 text-[#ffffff66] min-w-[86px] rounded-full transition-all duration-1000 ${confirm ? 'choose bg-[#960696] text-white font-bold' : ''} me-4`}>Voy</button>
            <button onClick={() => myAnwer(false)} className={`px-3 py-2 lg:px-4 lg:py-3 text-[#ffffff66] min-w-[86px] rounded-full transition-all duration-1000 ${!confirm ? 'choose bg-[#960696] text-white font-bold' : ''}`}>No voy</button>
        </div>
    )
}
