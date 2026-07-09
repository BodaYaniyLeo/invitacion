import { createBrowserSupabaseClient } from '@/app/lib/supabase/client';
import React from 'react'
import { ObjText, transferObj } from '../types/types';

interface props {
    id: number;
    name: string;
    church: boolean;
    yani: ObjText;
    leo: ObjText;
    payment_coverage: number;
    instructionsTransfer: transferObj;
}

export const useUpdate = async (
    dataSlug: Array<props>,
    setTextButton: (value: string) => void,
    setAnimateButton: (value: boolean) => void) => {

    const supabase = createBrowserSupabaseClient();

    const { error } = await supabase
        .from('slug')
        .upsert(dataSlug)
        .select()


    if (error) {
        console.log(error.message)
    } else {
        setAnimateButton(true)
        setTimeout(() => {
            setTextButton("Actualizado!");
            setAnimateButton(false)
        }, 500);
        setTimeout(() => {
            setTimeout(() => {
                setAnimateButton(true)
            }, 500);
            setTimeout(() => {
                setAnimateButton(false)
                setTextButton("Enviar cambios");
            }, 1000);
        }, 5000);
    }

}
