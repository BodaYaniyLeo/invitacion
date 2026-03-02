'use client'
import '@/src/styles/invitation.css'
import { ArrayElements } from './Invitation';

interface MenuProps {
    data: ArrayElements[];
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuComponent = ({
    data,
    setOpenMenu
}: MenuProps) => {

    const urlMaps = "https://maps.app.goo.gl/UudM3Bi5m6jQk3nW8"

    return (
        <div
            id="lateralMenu"
            className="fixed top-0 -right-2/3 flex flex-row w-2/3 items-center h-lvh bg-green-800 overflow-x-scroll overflow-y-hidden shrink-0 p-[3lvh] pointer-events-auto z-45"
        >
            <div className='flex flex-col uppercase mt-15 self-start'>
                <p className='text-[length:var(--h2size)] font-[family-name:var(--fontBold)]'>Acceso rápido</p>
                <a onClick={() => setOpenMenu(false)} href='#' className='text-[length:var(--h3size)] mb-3'>Inicio</a>
                <a onClick={() => setOpenMenu(false)} href='#Leo' className='text-[length:var(--h3size)] mb-3'>Leo</a>
                <a onClick={() => setOpenMenu(false)} href='#Yani' className='text-[length:var(--h3size)] mb-3'>Yani</a>
                <a onClick={() => setOpenMenu(false)} href='#itinerary' className='text-[length:var(--h3size)] mb-3'>Itinerario</a>
                <a onClick={() => setOpenMenu(false)} href={urlMaps} target='_blank' className='text-[length:var(--h3size)]  mb-3'>Abrir google maps</a>
                <a onClick={() => setOpenMenu(false)} href='#' className='text-[length:var(--h3size)] mb-3'>Código de vestimenta</a>
                <a onClick={() => setOpenMenu(false)} href='#' className='text-[length:var(--h3size)] mb-3'>Regalos</a>
                <a onClick={() => setOpenMenu(false)} href='#countdown' className='text-[length:var(--h3size)] mb-3'>Cuanto falta?</a>
                <a onClick={() => setOpenMenu(false)} href='#confirmData' className='text-[length:var(--h3size)] mb-3'>Confirmar asistencia</a>
            </div>
        </div >
    )
};