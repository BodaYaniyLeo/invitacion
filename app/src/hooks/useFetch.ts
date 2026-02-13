'use client'
import { createClient } from '@/app/lib/supabase'
import React, { useEffect, useState } from 'react'

type dataBase = {
    data?: any
}

export const useFetch = () => {

    const [resBase, setResBase] = useState<Array<dataBase>>([{}])

    const fetchData = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('guests')
            .select('*')

        if (error) {
            console.log(error.message)
            return
        }
        setResBase(data)

    }

    useEffect(() => {
        fetchData()
    }, [])

    return ({
        resBase
    })
}
