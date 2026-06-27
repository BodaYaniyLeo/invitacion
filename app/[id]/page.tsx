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

    const { data: infoDate, error: errorDate } = await supabase
        .from("info")
        .select("*")

    if (!data || !infoDate) {
        return (
            <div className='flex justify-center items-center bg-[#111117] h-dvh'>
                <div className='logo'></div>
            </div>
        )
    }

    return <Home data={data[0]} infoDate={infoDate} />
}
