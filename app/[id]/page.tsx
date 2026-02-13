import { createClient } from '@/app/lib/supabase'

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
            <h1>{data[0].name}</h1>
        </div>
    )
}
