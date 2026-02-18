'use client'
import { useEffect, useRef } from 'react'

interface VideoProps {
    id: string;
    src: string;
    zIndex: number;
}

export const VideoSection = ({ id, src, zIndex }: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const forceBuffer = () => {
            video.currentTime = video.duration || 0;
            video.addEventListener('seeked', () => {
                video.currentTime = 0;
            }, { once: true });
        };

        if (video.readyState >= 4) {
            forceBuffer();
        } else {
            video.addEventListener('canplaythrough', forceBuffer, { once: true });
        }
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
                muted
                playsInline
                preload="auto"
                x-webkit-airplay="deny"
                className="w-full h-full object-cover"
                data-priority="high"
                style={{ willChange: 'transform' }}
            />
        </div>
    );
};