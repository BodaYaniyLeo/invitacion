'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Invitation } from '@/src/components/Invitation';

export interface ArrayElements {
  sleep: boolean;
  church: boolean;
  guests: guestsObj[];
  comment: string;

}

export type guestsObj = {
  id: number;
  name: string;
  lastname: string;
  payment_coverage: number;
  state: string;
  room: number;
  confirm: boolean;
}

export interface userCommentsType {
  approbed: boolean,
  comment: string,
  created_at: Date,
  id: number,
  public: boolean,
  slug: string,
  user: string,
}

export type dataInv = {
  data: ArrayElements[],
  commentsData: userCommentsType[],
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Home({
  data,
  commentsData
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
            commentsData={commentsData}
          />
      }
    </>

  )
}
