"use client"

import { useRouter } from 'next/navigation';
import { useFetch } from './src/hooks/useFetch';
import { Invitation } from './src/components/Invitation';

export default function Home() {

  const router = useRouter();

  const arrayAnimations = ['Scroll', 'Opacity']
  const arrayModels = ['Model1', 'Model2']

  const { resBase } = useFetch()

  console.log(resBase)

  return (
    <div className="h-screen content-center justify-items-center">
      <Invitation />

      {/* <div className="text-center">
        <p className="mb-2">
          Elije una animación
        </p>
        <div className="flex flex-col items-center">
          {arrayAnimations.map(a =>
            <button
              key={a}
              className="w-full border-1 p-2 rounded-full my-2"
              onClick={() => router.push(`/animations/${a}`)}
            >
              Animación {a}
            </button>
          )
          }
        </div>
      </div>
      <div className="text-center">
        <p className="mb-2">
          Elije una Portada
        </p>
        <div className="flex flex-col items-center">
          {arrayModels.map(a =>
            <button
              key={a}
              className="w-full border-1 p-2 rounded-full my-2"
              onClick={() => router.push(`/models/${a}`)}
            >
              Portada {a}
            </button>
          )
          }
        </div>
      </div> */}
    </div >

  );
}
