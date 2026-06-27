import { createBrowserSupabaseClient } from "@/app/lib/supabase/client";
import { buttonConfirm } from "@/app/page";


export const sendChanges = async ({ guests, setTextButton, setAnimateButton }: buttonConfirm) => {

    const supabase = createBrowserSupabaseClient();

    const { data, error } = await supabase
        .from('guests')
        .upsert(guests)
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
                setTextButton("Enviar respuesta");
            }, 1000);
        }, 5000);

    }


}