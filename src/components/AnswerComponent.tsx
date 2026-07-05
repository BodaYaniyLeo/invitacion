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
    setVisibleOptions: (value: number) => void;
}

export const AnswerComponent = ({
    id,
    setDataGuest,
    dataGuest,
    confirm,
    status,
    setVisibleOptions
}: statusAnswer) => {

    const handleAnswer = (newValue: boolean | null) => {
        setDataGuest(prev => myAnswer(newValue, prev, id, status))
    }

    const isDeadLine = useDeadLine()

    if (status === "confirm") {
        return (
            <div className='relative flex justify-around items-center gap-2'>
                <button
                    onClick={() => { handleAnswer(true); setVisibleOptions(id) }}
                    className={`px-4 py-1.5 text-xs lg:text-sm min-w-[75px] rounded-full transition-all duration-500 ${confirm
                        ? 'btn-gradient-active'
                        : 'btn-gradient-inactive'
                        }`}
                    disabled={isDeadLine}
                >
                    Voy
                </button>
                <button
                    onClick={() => { handleAnswer(false); setVisibleOptions(id) }}
                    className={`px-4 py-1.5 text-xs lg:text-sm min-w-[75px] rounded-full transition-all duration-500 ${(!confirm && confirm != null)
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
    return null;
}