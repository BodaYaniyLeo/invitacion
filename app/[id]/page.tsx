import { createServerSupabaseClient } from "@/app/lib/supabase/server"
import Home from "../page"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
        .from("slug")
        .select(`*,
            guests(*)
            `)
        .eq("name", id)


    if (error || !data?.length ) {
        return <div>Grupo no encontrado</div>
    }

    return <Home data={data[0]} />
}
