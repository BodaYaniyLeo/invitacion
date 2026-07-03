import React from 'react'
import { myAnswer } from '@/src/helpers/useAnsGuest'
import { CarIcon } from './CarIcon';
import { guestsObj } from '../types/types';
import { useDeadLine } from '../hooks/useDeadLine';

type statusAnswer = {
    id: number;
    setDataGuest: React.Dispatch<React.SetStateAction<guestsObj[]>>;
    dataGuest: Array<guestsObj>;
    confirm: boolean;
    status: string;
}

export const AnswerComponent = ({
    id,
    setDataGuest,
    dataGuest,
    confirm,
    status
}: statusAnswer) => {

    const handleAnswer = (newValue: boolean | null) => {
        setDataGuest(prev => myAnswer(newValue, prev, id, status))
    }

    const isDeadLine = useDeadLine()

    if (status === "confirm") {
        const guest = dataGuest.find(f => f.id === id)
        return (
            <div className='relative flex justify-around items-center gap-2'>
                {(guest) &&
                    <CarIcon
                        data={guest}
                        setDataGuest={setDataGuest}
                    />

                }
                <button
                    onClick={() => handleAnswer(true)}
                    className={`px-4 py-1.5 text-xs lg:text-sm min-w-[75px] rounded-full transition-all duration-300 ${confirm
                        ? 'btn-gradient-active'
                        : 'btn-gradient-inactive'
                        }`}
                    disabled={isDeadLine}
                >
                    Voy
                </button>
                <button
                    onClick={() => handleAnswer(false)}
                    className={`px-4 py-1.5 text-xs lg:text-sm min-w-[75px] rounded-full transition-all duration-300 ${(!confirm && confirm != null)
                        ? 'btn-gradient-active'
                        : 'btn-gradient-inactive'
                        }`}
                    disabled={isDeadLine}
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
                    className={`py-1.5 px-4 text-xs lg:text-sm min-w-[100px] rounded-full transition-all duration-300 ${confirm
                        ? 'btn-gradient-active'
                        : 'btn-gradient-inactive'
                        }`}
                    disabled={isDeadLine}
                >
                    {confirm ? "Solicitado" : "No solicitado"}
                </button>
            </div>
        )
    }
    return null;
}