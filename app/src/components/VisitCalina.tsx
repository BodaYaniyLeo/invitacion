'use client'

import Image from 'next/image';
import logoCalina from '../assets/images/visitCalina.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/app/src/styles/invitation.css'
import { VideoSection } from './VideoSection';
import { useLayoutEffect, useRef } from 'react';

interface VideoProps {
    id: string;
    zIndex: number;
    progressRef: React.MutableRefObject<{ t: number }>;
    frames: string[];
    duration: number;
    video: string;
    containerH: number;
}

export const VisitCalina = ({
    id,
    zIndex,
    progressRef,
    frames,
    duration,
    video,
    containerH
}: VideoProps) => {

    const urlMaps = "https://www.google.com/maps/place/31%C2%B014'08.8%22S+64%C2%B015'26.3%22W/@-31.2357732,-64.2598859,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-31.2357778!4d-64.2573056?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D"

    return (
        <div
            className="flex flex-col justify-center items-center h-screen relative"
            style={{
                top: `${containerH}vh`
            }}
        >
            <div className='px-[10vw]'>
                <Image
                    src={logoCalina}
                    alt=""
                    className='logoCalina'
                />
            </div>
            <p className='font-bold text-[20px] text-center'>Ven a vivir este momento <br />especial.</p>
            <div className='bg-white w-[90vw] ratio-4/3 mt-[5vh] p-2'>
                <VideoSection
                    {...{

                        id,
                        zIndex,
                        progressRef,
                        frames,
                        duration,
                        video
                    }}
                />
            </div>
            <a
                href={urlMaps} target='_blank'
                className='flex mt-4 rounded-full bg-white px-8 py-4 text-black justify-center mt-[5vh]'
            >
                Descubre como llegar
            </a>
        </div>
    )
};