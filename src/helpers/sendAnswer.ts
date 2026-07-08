import { createBrowserSupabaseClient } from "@/app/lib/supabase/client";
import { buttonConfirm } from "../types/types";

export const sendChanges = async ({ guests, setTextButton, setAnimateButton }: buttonConfirm) => {

    const supabase = createBrowserSupabaseClient();
    const finalList = guests.map(g => {
        if (!g.confirm) {
            return {
                ...g,
                transfer: false
            };
        }
        return g;
    });

    const { error } = await supabase
        .from('guests')
        .upsert(finalList)
        .select()


    if (error) {
        console.log(error.message)
    } else {
        setAnimateButton(true)
        setTimeout(() => {
            setTextButton("Confirmado!");
            setAnimateButton(false)
        }, 500);
        setTimeout(() => {
            setTimeout(() => {
                setAnimateButton(true)
            }, 500);
            setTimeout(() => {
                setAnimateButton(false)
                setTextButton("Confirmar");
            }, 1000);
        }, 5000);
    }


}