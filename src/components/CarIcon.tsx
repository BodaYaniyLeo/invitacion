import { myAnswer } from "../helpers/useAnsGuest";
import { useDeadLine } from "../hooks/useDeadLine";
import { guestsObj } from "../types/types";

interface Props {
    data: guestsObj;
    setDataGuest: React.Dispatch<React.SetStateAction<guestsObj[]>>;
}

export function CarIcon({ data, setDataGuest }: Props) {

    const handleAnswer = (newValue: boolean | null) => {
        setDataGuest(prev => myAnswer(newValue, prev, data.id, "transfer"))
    }

    const isDeadLine = useDeadLine()

    return (
        <div className="flex justify-between px-2">
            <p className="me-2">Solicitar servicio de traslado</p>

            <button
                onClick={() => handleAnswer(true)}
                className={`transition-opacity duration-500 flex mx-1`}
                disabled={(!data.confirm || isDeadLine)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 15 15"
                    className={`${data.transfer ? "opacity-100" : "opacity-50"} duration-500`}
                >
                    <>
                        <path fill="currentColor" d="M2 3c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v8c0 1-1 1-1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1H5v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c-1 0-1-1-1-1zm1.5 1c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h8c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5zM4 9c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1m7 0c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1M4 2.5c0 .28.22.5.5.5h6c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-6c-.28 0-.5.22-.5.5" />

                    </>
                </svg>
            </button>

            <button
                onClick={() => handleAnswer(false)}
                className={`transition-opacity duration-500 flex mx-1`}
                disabled={(!data.confirm || isDeadLine)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 15 15"
                    className={`${!data.transfer ? "opacity-100" : "opacity-50"} duration-500`}
                >
                    <>
                        <path fill="currentColor" d="M2 3c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v8c0 1-1 1-1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1H5v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c-1 0-1-1-1-1zm1.5 1c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h8c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5zM4 9c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1m7 0c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1M4 2.5c0 .28.22.5.5.5h6c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-6c-.28 0-.5.22-.5.5" />

                        <line
                            x1="15"
                            y1="0"
                            x2="0"
                            y2="15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="[stroke-dasharray:26] animate-draw-line"
                        />
                    </>
                </svg>
            </button>

        </div>
    );

}