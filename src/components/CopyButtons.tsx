"use client"

import { useState } from "react";

interface Props {
    countPay: string;
    buttonType?: string;
}

export const CopyButtons = ({ countPay, buttonType }: Props) => {

    const [animateCopy, setAnimateCopy] = useState<boolean>(false);
    const [estadoBoton, setEstadoBoton] = useState<string>(`Copiar ${buttonType}`);


    const copyInfo = async (copyText: string | undefined) => {
        if (!copyText) return
        try {
            await navigator.clipboard.writeText(copyText);

            setAnimateCopy(true)
            setTimeout(() => {
                setEstadoBoton('¡Copiado!');
                setAnimateCopy(false)
            }, 500);
            setTimeout(() => {
                setTimeout(() => {
                    setAnimateCopy(true)
                }, 500);
                setTimeout(() => {
                    setAnimateCopy(false)
                    setEstadoBoton(`Copiar ${buttonType}`)
                }, 1000);
            }, 5000);

        } catch (err) {
            console.error('Error al copiar el texto: ', err);
        }
    };

    return (
        <button
            className="btn-copy uppercase font-bold py-2 active:scale-[0.98] w-fit min-w-[120px] rounded-lg"
            onClick={() => copyInfo(countPay)}
        >
            <span
                className={`font-[family-name:var(--fontNormal)] block transition-opacity duration-500 ${animateCopy ? "opacity-0" : "opacity-100"
                    }`}
            >
                {estadoBoton}
            </span>
        </button>
    )
}
