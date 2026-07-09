import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from '@/src/components/DashboardClient'
import { ArrayElements, guestsObj, typePay } from '@/src/types/types';

export interface DashboardGuest extends guestsObj {
    groupName: string;
    groupId: number;
    groupCoverage: number;
    textInvitation: string;
}

export interface DashboardClientProps {
    initialGuests: DashboardGuest[];
    groups: ArrayElements[];
    price: number;
}

export default async function AdminDashboard() {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return redirect('/admin/login')

    const [slugResult, dateResult, payResult] = await Promise.all([
        supabase.from("slug").select(`*, guests(*)`),
        supabase.from("info").select("*"),
        supabase.from("payments").select("*")
    ])

    const slugData = slugResult.data as ArrayElements[] | null
    const errorSlug = slugResult.error

    const infoPay = payResult.data as typePay[] | null
    const errorPay = payResult.error

    if (errorSlug || errorPay || !slugData || slugData.length === 0 || !infoPay) {
        console.error("Error cargando datos:", { errorSlug, errorPay });
        return (
            <div className='flex justify-center items-center bg-[#111117] h-dvh'>
                <p className="text-white">Error cargando la información.</p>
            </div>
        )
    }

    const allGuests: DashboardGuest[] = slugData.flatMap((group) =>
        group.guests.map((guest) => ({
            ...guest,
            groupName: group.name,
            groupId: group.id,
            groupCoverage: group.payment_coverage,
            textInvitation: group.textInvitation
        }))
    )

    const price = infoPay.find(f => f.id === "tarjeta")?.value || 0

    const total = allGuests.length
    const confirmed = allGuests.filter(f => f.confirm).length
    const cancelled = allGuests.filter(f => f.confirm === false).length
    const pending = allGuests.filter(f => f.confirm === null).length

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[#111117]">
            <h1 className="text-3xl font-bold mb-6 text-white">Panel de Administración</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[hsl(200,5,12,1)] p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
                    <p className="text-sm text-gray-400 font-medium">Total Invitados</p>
                    <p className="text-2xl font-bold text-white">{total}</p>
                </div>
                <div className="bg-[hsl(200,5,12,1)] p-4 rounded-xl shadow-sm border-l-4 border-green-500">
                    <p className="text-sm text-gray-400 font-medium">Confirmados</p>
                    <p className="text-2xl font-bold text-green-500">{confirmed}</p>
                </div>
                <div className="bg-[hsl(200,5,12,1)] p-4 rounded-xl shadow-sm border-l-4 border-red-500">
                    <p className="text-sm text-gray-400 font-medium">No asisten</p>
                    <p className="text-2xl font-bold text-red-500">{cancelled}</p>
                </div>
                <div className="bg-[hsl(200,5,12,1)] p-4 rounded-xl shadow-sm border-l-4 border-yellow-400">
                    <p className="text-sm text-gray-400 font-medium">Sin respuesta</p>
                    <p className="text-2xl font-bold text-yellow-500">{pending}</p>
                </div>
            </div>

            <DashboardClient
                initialGuests={allGuests}
                groups={slugData}
                price={price}
            />
        </div>
    )
}