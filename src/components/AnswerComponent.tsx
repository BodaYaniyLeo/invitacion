import React from 'react'
import { ArrayElements } from './Invitation'

type statusAnswer = {
    id: number
    setDataGuest: React.Dispatch<React.SetStateAction<ArrayElements[]>>
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
        <div className='flex justify-around my-4'>
            <button onClick={() => myAnwer(true)} className={`buttonConfirm ${confirm ? 'choose' : ''}`}>Voy</button>
            <button onClick={() => myAnwer(false)} className={`buttonConfirm ${!confirm ? 'choose' : ''}`}>No voy</button>
        </div>
    )
}
