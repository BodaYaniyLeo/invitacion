'use server'

import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '../lib/supabase/server'

export async function loginAdmin(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = await createServerSupabaseClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect('/admin/login?error=Credenciales incorrectas')
    }

    return redirect('/admin/dashboard')
}