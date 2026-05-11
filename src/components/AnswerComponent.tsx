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
            <button onClick={() => myAnwer(true)} className={`p-1 lg:px-4 lg:py-3 text-[#ffffff66] min-w-[80px] rounded-full transition-all duration-1000 ${confirm ? 'choose bg-[#960696] text-white font-bold' : ''} mx-2`}>Voy</button>
            <button onClick={() => myAnwer(false)} className={`p-1 lg:px-4 lg:py-3 text-[#ffffff66] min-w-[80px] rounded-full transition-all duration-1000 ${!confirm && confirm != null ? 'choose bg-[#960696] text-white font-bold' : ''}`}>No voy</button>
        </div>
    )
}
