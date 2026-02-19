import { createServerSupabaseClient } from "@/app/lib/supabase/server"
import { Invitation } from "../src/components/Invitation"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("slug", id)

    if (error || !data?.length) {
        return <div>Grupo no encontrado</div>
    }

    return <Invitation data={data}/>
}
