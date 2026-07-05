import { useState, useEffect } from 'react';
import { FoodProps } from '../types/types';

export const InputFood = ({ id, setDataGuest, lastAnswer }: FoodProps) => {

    const [value, setValue] = useState<string>("");
    const [isFocus, setIsFocus] = useState<boolean>();

    useEffect(() => {
        setValue(lastAnswer || "")
    }, [])


    useEffect(() => {
        const timer = setTimeout(() => {
            setDataGuest(prev => prev.map(guest =>
                guest.id === id ? { ...guest, foodPreferents: value } : guest
            ));
        }, 300);

        return () => clearTimeout(timer);
    }, [value, id, setDataGuest]);

    return (
        <div className="flex w-full">
            <input
                id={id.toString()}
                value={value}
                placeholder='Cuéntanos si tienes alergias o preferencias'
                className={`rounded-full w-full border px-2 py-1 w-3/4 outline-none duration-500 ${isFocus ? "opacity-100" : "opacity-50"}`}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </div>

    );
};