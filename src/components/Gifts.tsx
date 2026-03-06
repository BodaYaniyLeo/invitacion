"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { gsap } from 'gsap'
import church from "@/src/assets/images/itinerary/church.svg"
import martini from "@/src/assets/images/itinerary/martini.svg"
import music from "@/src/assets/images/itinerary/music.svg"
import ring from "@/src/assets/images/itinerary/ring.svg"
import coffe from "@/src/assets/images/itinerary/coffe.svg"
import Image, { StaticImageData } from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/src/styles/invitation.css'
import { ArrayElements } from '@/app/page'


interface MenuProps {
    data: ArrayElements[];
}

interface itineraryObj {
    id: string,
    image: StaticImageData | string,
    text: string,
    horario: string
}

export const Gifts = ({
    data
}: MenuProps) => {

    return (
        <div id="itinerary" className='h-lvh content-center'>
            <h2 className='text-center text-white font-(family-name:--fontBold) text-[40px]'>Itinerario</h2>
            <div className="flex flex-1 flex-col justify-self-center self-center">

            </div>
        </div>
    )
}
