import { Metadata } from 'next'
import { createServerSupabaseClient } from "@/app/lib/supabase/server"
import Home from "../page"

export const metadata: Metadata = {
    title: "Yani y Leo",
    description: "Invitación Yani y Leo.",
    openGraph: {
        title: "Yani y Leo | ",
        description: "Invitación Yani y Leo.",
        images: [
            {
                url: "/imgMeta.png",
                width: 1200,
                height: 630,
                alt: "Te invitamos. Yani y Leo",
            }
        ],
        type: "website",
    },
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    if (!id) {
        return (
            <div className='flex justify-center items-center bg-[#111117] h-dvh'>
                <p className="text-white">ID no válido</p>
            </div>
        )
    }

    const supabase = createServerSupabaseClient()

    const { data: slugData, error: errorSlug } = await supabase
        .from("slug")
        .select(`*, guests(*)`)
        .eq("name", id)

    const { data: infoDate, error: errorDate } = await supabase
        .from("info")
        .select("*")

    const { data: infoPay, error: errorPay } = await supabase
        .from("payments")
        .select("*")

    if (
        errorSlug || errorDate || errorPay ||
        !slugData || slugData.length === 0 ||
        !infoDate || !infoPay
    ) {
        console.error("Error cargando datos de Supabase:", { errorSlug, errorDate, errorPay });

        return (
            <div className='flex justify-center items-center bg-[#111117] h-dvh'>
                <div className='logo'></div>
            </div>
        )
    }

    return <Home data={slugData[0]} infoDate={infoDate} infoPay={infoPay} />
}