"use client"

import { useRouter } from 'next/navigation';
import { useFetch } from './src/hooks/useFetch';
import { Invitation } from './src/components/Invitation';

export default function Home() {

  const router = useRouter();


  const { resBase } = useFetch()

  return (
    <div className="h-lvh content-center justify-items-center">
      
    </div >

  );
}
