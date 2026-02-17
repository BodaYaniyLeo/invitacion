'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const FrontLine = () => {


    return (
        <div className='absolute inset-0 nameNovios px-[10vw] h-screen section-text'>
            <div className='h-screen'></div>
            <div className='h-screen'></div>
            <h2 className='mb-[25px]'>Leo</h2>
            <h4 className='text-[30px] mb-[12px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    )
}