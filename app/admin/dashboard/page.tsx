import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { DataGuest } from '@/src/components/DataGuest'
import { ArrayElements } from '@/src/types/types'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    const [slugResult, dateResult, payResult] = await Promise.all([
        supabase.from("slug").select(`*, guests(*)`),
        supabase.from("info").select("*"),
        supabase.from("payments").select("*")
    ])

    const { data: slugData, error: errorSlug } = slugResult
    const { data: infoDate, error: errorDate } = dateResult
    const { data: infoPay, error: errorPay } = payResult

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


    if (!user) {
        return redirect('/admin/login')
    }

    const allGuests = slugData.flatMap(f => f.guests)

    return (
        <div>
            <div>
                <p>Total invitados: <span>{allGuests.length}</span></p>
                <p className='text-[green]'>Confirmado: <span>{allGuests.filter(f => f.confirm).length}</span></p>
                <p className='text-[red]'>No van: <span>{allGuests.filter(f => f.confirm === false).length}</span></p>
                <p className='text-[yellow]'>No respondieron: <span>{allGuests.filter(f => f.confirm === null).length}</span></p>
            </div>

            <div className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center w-full border-b pb-2 font-bold'>
                <p>Grupo</p>
                <p className='text-center'>Total invitados (grupo)</p>
                <p className='text-[green] text-center'>Confirmado</p>
                <p className='text-[red] text-center'>No van</p>
                <p className='text-[yellow] text-center'>No respondieron</p>
            </div>

            <div className="flex flex-col w-full mt-2">
                {slugData
                    .sort((a, b) => a.id - b.id)
                    .map((group: ArrayElements) =>
                        <DataGuest group={group} key={group.id} price={infoPay.find(f => f.id === "tarjeta").value} />
                    )}
            </div>
        </div>
    )
}