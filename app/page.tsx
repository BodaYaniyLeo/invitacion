'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Invitation } from '@/src/components/Invitation';
import { dataInv } from '@/src/types/types';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Home({ data, infoDate, infoPay }: dataInv) {
  const [isSiteReady, setIsSiteReady] = useState(false)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {

    const checkDimension = () => setIsDesktop(window.innerWidth >= 992)
    checkDimension();
    window.addEventListener('resize', checkDimension);

    let loadTimer: NodeJS.Timeout;

    const handleLoad = () => {
      loadTimer = setTimeout(() => {
        setIsSiteReady(true);
      }, 3000);
    };

    gsap.to(window, {
      scrollTo: 0,
      duration: 0.5,
      onComplete: () => {
        handleLoad();
      }
    });

    return () => {
      window.removeEventListener('resize', checkDimension);
      if (loadTimer) clearTimeout(loadTimer);
    };
  }, []);

  if (!data) {
    return (
      <div className='flex justify-center items-center bg-[#111117] h-dvh'>
        <div className='logo'></div>
      </div>
    )
  }

  return (
    <>
      <div className={`fixed inset-0 bg-[#111117] flex w-screen z-[99] justify-center items-center ${isSiteReady ? "hidden" : ""}`}>
        <div className='logo'></div>
      </div>
      <Invitation
        data={data}
        isDesktop={isDesktop}
        infoDate={infoDate}
        infoPay={infoPay}
      />
    </>
  )
}