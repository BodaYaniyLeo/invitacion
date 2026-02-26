import Image from 'next/image';
import '@/app/src/styles/invitation.css'
import salonImage from '@/public/videos/frames/calinaVideo/calinaVideo_0001.webp'

interface VideoProps {
    id: string;
    progressRef: React.MutableRefObject<{ t: number }>;
    frames: string[];
    duration: number;
    video: string;
}

export const InfoSalon = () => {

    const urlMaps = "https://www.google.com/maps/place/31%C2%B014'08.8%22S+64%C2%B015'26.3%22W/@-31.2357732,-64.2598859,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-31.2357778!4d-64.2573056?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D"

    return (
        <div
            className="flex justify-center items-center h-lvh w-full bg-green-800 overflow-x-scroll"
        >
            <div className='flex flex-col'>

                <div id="#header">
                    <button>Atrás</button>
                    <div>
                        <span>
                            BARRA DE AVANCE
                        </span>
                    </div>
                </div>
                <div className="pointer-events-auto flex flex-col items-center">
                    <div className='bg-white w-[85vw] aspect-4/3 p-2 mt-5 -rotate-4'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24454.58166116321!2d-0.049152!3d39.9900672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1772134392716!5m2!1ses!2ses" style={{ border: 0, aspectRatio: "4/3" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div>
                        <h2>
                        </h2>
                        <p>
                            Dirección: Ruta E-53 km 15, jurisdicción Unquillo
                        </p>
                        <a
                            href={urlMaps} target='_blank'
                            className='flex mt-4 rounded-full bg-white px-8 py-4 text-black justify-center mt-5'
                        >
                            Ir a google maps
                        </a>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>

            </div>
        </div>
    )
};