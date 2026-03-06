import Image from 'next/image';
import logoCalina from '../assets/images/salon/visitCalina.svg'
import '@/src/styles/invitation.css'
import { VideoSection } from './VideoSection';

interface VideoProps {
    id: string;
    progressRef: React.MutableRefObject<{ t: number }>;
    frames: string[];
    duration: number;
    video: string;
    handleInfoSalon: () => void;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const VisitCalina = ({
    id,
    progressRef,
    frames,
    duration,
    video,
    handleInfoSalon,
    setOpenMenu
}: VideoProps) => {

    return (
        <div
            id={id}
            className="flex flex-col justify-center items-center h-lvh relative"
        >
            <div className='z-11'>
                <div className='flex flex-col lg:flex-row items-center justify-around'>
                    <div className='px-[10vw] justify-self-center'>
                        <Image
                            src={logoCalina}
                            alt=""
                            className='logoCalina'
                        />
                    </div>
                    <p className='font-bold text-(length:--h4size) text-center text-white'>Ven a vivir este momento <br />especial.</p>
                </div>
                <div id='photoSalon' className="pointer-events-auto flex flex-col items-center">
                    <div className='bg-white w-[clamp(50vw,90vw,500px)] ratio-4/3 p-2 mt-5'>

                        <VideoSection
                            {...{
                                id: `${id}-internal-video`,
                                progressRef,
                                frames,
                                duration,
                                video
                            }}
                        />
                    </div>
                    <button
                        className='flex mt-4 rounded-full bg-white px-8 py-4 text-black justify-center mt-5 font-bold text-(length:--h5size)'
                        onClick={() => {
                            handleInfoSalon();
                            setOpenMenu(false);
                        }}
                    >
                        Descubre Calina
                    </button>
                </div>
            </div>
        </div>
    )
};