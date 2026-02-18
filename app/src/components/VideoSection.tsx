'use client'
import { useEffect, useRef, useCallback } from 'react'

interface VideoProps {
    id: string;
    src: string;
    zIndex: number;
    poster?: string;
}

export const VideoSection = ({ id, src, zIndex, poster }: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const rVFCHandle = useRef<number>(0);

    // Expone el video al window para que GSAP pueda setear currentTime
    // desde afuera sin pasar por React state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Preload agresivo: descarga todo el video antes de que la sección sea visible
        const handleCanPlayThrough = () => {
            // Seek al final y volver para forzar que el browser cachee todos los frames
            const duration = video.duration;
            video.currentTime = duration;

            const resetToStart = () => {
                video.currentTime = 0;
                video.removeEventListener('seeked', resetToStart);
            };
            video.addEventListener('seeked', resetToStart);
        };

        if (video.readyState >= 4) {
            handleCanPlayThrough();
        } else {
            video.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
        }

        return () => {
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
    }, []);

    return (
        <div
            id={id}
            className="fixed top-0 left-0 w-full h-screen"
            style={{ zIndex, visibility: 'hidden' }}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                muted
                playsInline
                preload="auto"
                // Desactiva controles nativos del browser que interfieren con scrubbing
                disablePictureInPicture
                disableRemotePlayback
                className="w-full h-full object-cover"
            />
        </div>
    );
};