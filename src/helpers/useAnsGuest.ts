import { guestsObj } from '@/app/page'

export const myAnswer = (newValue: boolean | null, prev: guestsObj[], id: number, key: string) => {
    return prev.map((guest) => {
        if (guest.id !== id) return guest;

        const hasTimeConfirm = guest.timeConfirm !== null;

        const updatedGuest = {
            ...guest,
            [key]: newValue,
            lastTimeConfirm: new Date(),
            ...(!hasTimeConfirm && { timeConfirm: new Date() })
        };

        return updatedGuest;
    });
};