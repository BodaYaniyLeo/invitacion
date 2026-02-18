'use client'

interface TextLayerProps {
    id: string;
    title: string;
    subtitle: string;
    text: string;
    contH: number;
}

export const ZTextLayer = ({ id, title, subtitle, text, contH }: TextLayerProps) => {
    return (
        <div
            id={id}
            className="flex flex-col pointer-events-none h-screen relative z-12 top-[600vh]"
        >
            <div className={`section-text h-[${contH}vh]`} >
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