import { createClient } from '@/app/lib/supabase'
import { Invitation } from '../src/components/Invitation'

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    const supabase = createClient()

    const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('slug', id)

    if (error || !data) {
        return <div>Grupo no encontrado</div>
    }

    return (
        <div>
            <Invitation />
        </div>
    )
}
