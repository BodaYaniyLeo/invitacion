import '@/src/styles/invitation.css'

export const Intro = () => {
    return (
        <div
            id='containerTextOrg'
            className="absolute h-lvh inset-0 z-10 opacity-0 flex flex-col items-center justify-center overflow-hidden"
        >
            <div id='textOrg' className='flex flex-col h-full justify-center px-[10vw] scale-125'>
                <div id='textOrgInner'>
                    <h2>Córdoba,<br />Argentina</h2>
                    <p className='w-full text-base/8 mt-6'>
                        Yani y Leo siempre supieron que la vida podía sorprenderlos, pero mientras organizaban su gran día, los imprevistos no tardaron en aparecer. Entre risas, abrazos y momentos inesperados, se han apoyado el uno en el otro más que nunca… y ahora quieren que vos seas parte de esta aventura única, para celebrar juntos el amor que los une y que hace que cada instante valga la pena.
                    </p>
                </div>
            </div>
        </div>
    )
}