'use client'

interface TextLayerProps {
    id: string;
    title: string;
    subtitle: string;
    text: string;
    containerH: string;
}

export const ZTextLayer = ({ id, title, subtitle, text, containerH }: TextLayerProps) => {
    return (
        <div
            id={id}
            className="flex flex-col pointer-events-none absolute z-12"
            style={{top: `${containerH}vh`}}
        >
            <div className={`section-text h-screen w-screen`} >
                <div className="max-w-2xl text-white nameNovios px-[10vw]">
                    <h2>
                        {title}
                    </h2>
                    <h4 className="text-xl font-light leading-relaxed opacity-80 shadow-black drop-shadow-lg">
                        {subtitle}
                    </h4>
                    <p className="text-xl font-light leading-relaxed opacity-80 shadow-black drop-shadow-lg">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};