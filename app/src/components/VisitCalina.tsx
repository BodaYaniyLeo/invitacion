import Image from 'next/image';
import logoCalina from '../assets/images/salon/visitCalina.svg'
import '@/app/src/styles/invitation.css'
import { VideoSection } from './VideoSection';

interface VideoProps {
    id: string;
    progressRef: React.MutableRefObject<{ t: number }>;
    frames: string[];
    duration: number;
    video: string;
}

export const VisitCalina = ({
    id,
    progressRef,
    frames,
    duration,
    video,
}: VideoProps) => {

    const urlMaps = "https://www.google.com/maps/place/31%C2%B014'08.8%22S+64%C2%B015'26.3%22W/@-31.2357732,-64.2598859,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-31.2357778!4d-64.2573056?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D"

    return (
        <div
            id={id}
            className="flex flex-col justify-center items-center h-lvh"
        >
            <div className='px-[10vw]'>
                <Image
                    src={logoCalina}
                    alt=""
                    className='logoCalina'
                />
            </div>
            <p className='font-bold text-[20px] text-center text-white'>Ven a vivir este momento <br />especial.</p>
            <div className="pointer-events-auto flex flex-col items-center">
                <div className='bg-white w-[90vw] ratio-4/3 p-2 mt-5'>
                
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
                <a
                    className='flex mt-4 rounded-full bg-white px-8 py-4 text-black justify-center mt-5'
                >
                    Descubre como llegar
                </a>
            </div>
        </div>
    )
};