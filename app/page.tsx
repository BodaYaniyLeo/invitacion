'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Invitation } from '@/src/components/Invitation';

export interface ArrayElements {
  id: number;
  name: string;
  lastname: string;
  payment_coverage: number;
  state: string;
  confirm: boolean;
  room: number;
  slug: slugObj;
}

export type slugObj = {
  sleep: boolean;
  church: boolean;
}

export type dataInv = {
  data: ArrayElements[]
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Home({
  data
}: dataInv) {

  const [preLoad, setPreLoad] = useState<boolean>(true)

  useEffect(() => {

    gsap.to(window, {
      scrollTo: 0,
      duration: 0.5,
      onComplete: () => setPreLoad(false)
    });
  }, []);

  return (
    <>
      {
        preLoad
          ? <div className='fixed inset-0'>Cargando</div>
          : <Invitation
            data={data}
          />
      }
    </>

  )
}
