import { createServerSupabaseClient } from "@/app/lib/supabase/server"
import { Invitation } from "../src/components/Invitation"


export default async function Page({
    params,
}: {
    params: { id: string }
}) {

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("slug", params.id)

    if (error || !data) {
        return <div>Grupo no encontrado</div>
    }

    return <Invitation />
}
