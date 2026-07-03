import { myAnswer } from "../helpers/useAnsGuest";
import { guestsObj } from "../types/types";

interface Props {
    data: guestsObj;
    setDataGuest: React.Dispatch<React.SetStateAction<guestsObj[]>>;
}

export function CarIcon({ data, setDataGuest }: Props) {

    const handleAnswer = (newValue: boolean | null) => {
        setDataGuest(prev => myAnswer(newValue, prev, data.id, "transfer"))
    }

    return (
        <button
            onClick={() => handleAnswer(!data.transfer)}
            className={`${data.transfer ? "opacity-100" : "opacity-50"} ${data.confirm ? "pointer-events-auto" : "pointer-events-none"} transition-opacity duration-500`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
            >
                {data.confirm && (
                    <>
                        <path
                            fill="currentColor"
                            d="m5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8z"
                        />

                        {!data.transfer && (
                            <line
                                x1="21"
                                y1="3"
                                x2="3"
                                y2="21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                className="[stroke-dasharray:26] animate-draw-line"
                            />
                        )}
                    </>
                )}
            </svg>
        </button>
    );

}