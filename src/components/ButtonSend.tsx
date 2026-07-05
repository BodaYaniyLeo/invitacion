"use client"
import { useEffect, useState, useRef } from 'react'
import { sendChanges } from '../helpers/sendAnswer'
import { GuestData, guestsObj } from '../types/types';
import { useDeadLine } from '../hooks/useDeadLine';

interface ButtonSendProps {
    dataGuest: Array<guestsObj>;
}

export const ButtonSend = ({ dataGuest }: ButtonSendProps) => {
    const [animateButton, setAnimateButton] = useState<boolean>(false)
    const [textButton, setTextButton] = useState<string>("Confirmar")

    const [lastData, setLastData] = useState<Array<GuestData>>([])
    const isInitialized = useRef<boolean>(false)
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    useEffect(() => {
        if (isInitialized.current) return;

        if (dataGuest && dataGuest.length > 0) {
            setLastData(JSON.parse(JSON.stringify(dataGuest)));
            isInitialized.current = true;
        }
    }, [dataGuest]);

    useEffect(() => {
        if (!lastData || lastData.length === 0 || !dataGuest || dataGuest.length === 0) {
            setHasChanges(false);
            return;
        }

        const anyChange = dataGuest.some((guest) => {
            const originalGuest = lastData.find((g) => g.id === guest.id);

            if (!originalGuest) return false;

            const cambioConfirm = guest.confirm !== originalGuest.confirm;
            const cambioTransfer = guest.transfer !== originalGuest.transfer;
            const cambioFoodPreferents = guest.foodPreferents !== originalGuest.foodPreferents;

            return cambioConfirm || cambioTransfer || cambioFoodPreferents;
        });

        setHasChanges(anyChange);
    }, [dataGuest, lastData]);

    const handleSend = () => {
        sendChanges({ guests: dataGuest, setTextButton, setAnimateButton });
        setTimeout(() => {
            if (dataGuest) {
                setLastData(JSON.parse(JSON.stringify(dataGuest)));
                setHasChanges(false);
            }
        }, 5000);
    };

    const isDeadLine = useDeadLine()

    return (
        <>
            {!isDeadLine &&

                <button
                    className={`btn-send p-3 font-bold uppercase transition-all duration-500 transform min-w-[130px] w-fit self-end rounded-full fixed bottom-4 right-4 z-91
                ${hasChanges
                            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                            : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
                        }
                `}
                    onClick={handleSend}
                >
                    <span
                        className={`${animateButton ? "opacity-0" : "opacity-100"} duration-500 justify-center
                        font-[family-name:var(--fontNormal)] flex items-center gap-2`}
                    >
                        <span className="text-sm tracking-wider">{textButton}</span>
                    </span>
                </button>
            }
        </>
    )
}