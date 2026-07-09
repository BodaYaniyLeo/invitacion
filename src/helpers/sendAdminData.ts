import { createBrowserSupabaseClient } from "@/app/lib/supabase/client";
import { buttonConfirm } from "../types/types";

export const sendAdminData = async ({ guests, setTextButton, setAnimateButton, col, setPendingChanges, text }: buttonConfirm) => {

    const supabase = createBrowserSupabaseClient();

    if (!col) return

    try {
        const updatePromises = guests.map(g =>
            supabase
                .from('guests')
                .update({ [col]: g[col] })
                .eq('id', g.id)
        );

        const responses = await Promise.all(updatePromises);

        const hasError = responses.some(res => res.error);

        if (hasError) {
            console.log("Hubo un error en alguna de las actualizaciones");
        } else if (setPendingChanges && setAnimateButton && setTextButton) {
            setAnimateButton(true)
            setTimeout(() => {
                setTextButton("Guardado!");
                setAnimateButton(false)
            }, 500);
            setTimeout(() => {
                setTimeout(() => {
                    setAnimateButton(true)
                }, 500);
                setTimeout(() => {
                    setAnimateButton(false)
                    setTextButton(text);
                }, 1000);
                setPendingChanges([])
            }, 5000);

        } else {
            setAnimateButton(false)
        }

    } catch (err) {
        console.error("Error en la petición:", err);
    }
};