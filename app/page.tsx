"use client"

import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const arrayAnimations = ['scroll', 'opacity']

  return (
    <div className="h-screen content-center">
      <div className="text-center">
        <p className="mb-2">
          Elije una animación
        </p>
        <div className="flex flex-col items-center">
          {arrayAnimations.map(a =>
            <button
              key={a}
              className="w-full border-1 p-2 rounded-full my-2"
              onClick={() => router.push(`/${a}`)}
            >
              Animación {a}
            </button>
          )
          }
        </div>
      </div>
    </div >

  );
}
