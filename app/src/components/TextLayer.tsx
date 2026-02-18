'use client'

interface TextLayerProps {
    id: string;
    title: string;
    subtitle: string;
    text: string;
    align?: 'left' | 'right' | 'center';
}

export const TextLayer = ({ id, title, subtitle, text, align = 'left' }: TextLayerProps) => {
    const alignClass = {
        left: 'items-start text-left px-[10vw]',
        right: 'items-end text-right px-[10vw]',
        center: 'items-center text-center px-[5vw]',
    }[align];

    return (
        <div
            id={id}
            className={`fixed inset-0 z-[15] flex flex-col justify-center pointer-events-none ${alignClass}`}
            style={{ overflow: 'hidden' }}
        >
            <div className="max-w-xl text-white">
                <h2
                    className="text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-none tracking-tight mb-4"
                    style={{
                        textShadow: '0 0 80px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.9)',
                        fontStyle: 'italic',
                    }}
                >
                    {title}
                </h2>

                <p
                    className="text-[clamp(1rem,2vw,1.4rem)] font-light italic leading-relaxed mb-3"
                    style={{
                        textShadow: '0 2px 10px rgba(0,0,0,1)',
                        opacity: 0.9,
                    }}
                >
                    &ldquo;{subtitle}&rdquo;
                </p>

                <p
                    className="text-[clamp(0.85rem,1.5vw,1.1rem)] font-light leading-relaxed"
                    style={{
                        textShadow: '0 2px 8px rgba(0,0,0,1)',
                        opacity: 0.75,
                        maxWidth: '480px',
                    }}
                >
                    {text}
                </p>
            </div>
        </div>
    );
};