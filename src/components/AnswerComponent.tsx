import React from 'react'
import { guestsObj } from '@/app/page'
import { myAnswer } from '@/src/helpers/useAnsGuest'

type statusAnswer = {
    id: number
    setDataGuest: React.Dispatch<React.SetStateAction<guestsObj[]>>
    confirm: boolean
    status: string
}

export const AnswerComponent = ({
    id,
    setDataGuest,
    confirm,
    status
}: statusAnswer) => {

    const handleAnswer = (newValue: boolean | null) => {
        setDataGuest(prev => myAnswer(newValue, prev, id, status))
    }

    if (status === "confirm") {
        return (
            <div className='flex justify-around items-center gap-2'>
                <button 
                    onClick={() => handleAnswer(true)} 
                    className={`px-4 py-1.5 text-xs lg:text-sm min-w-[75px] rounded-full transition-all duration-300 ${
                        confirm 
                        ? 'btn-gradient-active' 
                        : 'btn-gradient-inactive'
                    }`}
                >
                    Voy
                </button>
                <button 
                    onClick={() => handleAnswer(false)} 
                    className={`px-4 py-1.5 text-xs lg:text-sm min-w-[75px] rounded-full transition-all duration-300 ${
                        (!confirm && confirm != null) 
                        ? 'btn-gradient-active' 
                        : 'btn-gradient-inactive'
                    }`}
                >
                    No voy
                </button>
            </div>
        )
    }
    
    if (status === "transfer") {
        return (
            <div className='flex justify-around items-center'>
                <button 
                    onClick={() => handleAnswer(!confirm)} 
                    className={`py-1.5 px-4 text-xs lg:text-sm min-w-[100px] rounded-full transition-all duration-300 ${
                        confirm 
                        ? 'btn-gradient-active' 
                        : 'btn-gradient-inactive'
                    }`}
                >
                    {confirm ? "Solicitado" : "No solicitado"}
                </button>
            </div>
        )
    }
    return null;
}