'use client'

interface TextLayerProps {
    id: string;
    title: string;
    subtitle: string;
    text: string;
}

export const TextLayer = ({ id, title, subtitle, text }: TextLayerProps) => {
    return (
        <div
            id={id}
            className="flex flex-col justify-center pointer-events-none h-screen relative z-12 top-[250vh]"
        >
            <div className="section-text ">
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