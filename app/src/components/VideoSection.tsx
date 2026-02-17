interface VideoProps {
    id: string;
    src: string;
    zIndex: number;
}

export const VideoSection = ({ id, src, zIndex }: VideoProps) => {
    return (
        <div 
            id={id} 
            className="fixed top-0 left-0 w-full h-screen" 
            style={{ zIndex, visibility: 'hidden' }} // GSAP usará autoAlpha para mostrarlo
        >
            <video
                src={src}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
            />
        </div>
    );
};