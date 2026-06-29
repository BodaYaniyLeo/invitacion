"use client"

import { useEffect, useState } from "react"
import { gsap } from 'gsap'
import Image, { StaticImageData } from "next/image"
import minus from "@/public/dress/minus.png"

import maniqui from "@/public/dress/ella.png"


// import vestAzul from "@/src/assets/images/dress/she/vestAzul.png"
// import vestDorado from "@/src/assets/images/dress/she/vestDorado.png"
// import vestFlores from "@/src/assets/images/dress/she/vestFlores.png"
// import vestNegro from "@/src/assets/images/dress/she/vestNegro.png"
// import vestPerla from "@/src/assets/images/dress/she/vestPerla.png"
// import vestVerde from "@/src/assets/images/dress/she/vestVerde.png"

// import blusaBeige from "@/src/assets/images/dress/she/.png"
// import blusaMarfil from "@/src/assets/images/dress/she/.png"
// import blusaNegra from "@/src/assets/images/dress/she/.png"
// import blusaPerla from "@/src/assets/images/dress/she/.png"
// import pantBlanco from "@/src/assets/images/dress/she/.png"
// import  from "@/src/assets/images/dress/she/.png"
// import  from "@/src/assets/images/dress/she/.png"
// import  from "@/src/assets/images/dress/she/.png"
// import  from "@/src/assets/images/dress/she/.png"
// import  from "@/src/assets/images/dress/she/.png"
// import  from "@/src/assets/images/dress/she/.png"
// import  from "@/src/assets/images/dress/she/.png"

import '@/src/styles/invitation.css'

interface Option {
    name: string,
    url: string
}

interface Category {
    [key: string]: Option[];
}

interface VestimentaF {
    Vestido?: null | string;
    Sup?: null | string;
    Inf?: null | string;
}

interface arrayType {
    Vestido?: Array<Option>;
    Blusa?: Array<Option>;
    Pantalon?: Array<Option>;
    Pollera?: Array<Option>;
    Top?: Array<Option>;
}

interface DressProps {
    widthOpposite: (idSelected: string, idNoSelected: string) => void;
    select: boolean,
    setSelect: (value: boolean) => void
}

const imageContext = (require as any).context('../../public/dress/she', true, /\.png$/);

export const DressCodeShe = ({
    widthOpposite,
    select,
    setSelect
}: DressProps) => {

    const imageNames = imageContext.keys();

    const [modelArray, setModelArray] = useState<Array<arrayType>>([])
    const [categories, setCategories] = useState(['vestido', 'blusa', 'pantalon', 'pollera', 'top'])

    useEffect(() => {
        let temporalEl: Array<arrayType> = [];

        categories.forEach(cat => {
            const capCat = cat.charAt(0).toUpperCase() + cat.slice(1);

            let imgList: Array<Option> = [];

            imageNames.forEach((data: string) => {
                if (data.includes(cat)) {
                    const route = data.slice(2)
                    const clearEl = data.slice(2).split('/');
                    const nameEl = data.slice(data.search(/[A-Z]/)).replace('.png', '');

                    imgList.push({
                        url: "/dress/she/" + route,
                        name: capCat + " " + nameEl
                    });
                }
            });

            temporalEl.push({
                [capCat]: imgList
            });
        });


        setModelArray(temporalEl);

    }, []);

    const [vestimentaF, setVestimentaF] = useState<VestimentaF>({
        Vestido: null,
        Sup: null,
        Inf: null,
    })

    useEffect(() => {
        if (modelArray?.[1] && modelArray?.[2]) {
            setVestimentaF({
                Vestido: null,
                Sup: modelArray[1].Blusa ? modelArray[1].Blusa[0].url : null,
                Inf: modelArray[2].Pantalon ? modelArray[2].Pantalon[0].url : null,
            });
        }
    }, [modelArray]);

    const [sectionF, setSectionF] = useState<string | null>()

    useEffect(() => {
        modelArray.forEach(e => {
            const id = Object.keys(e)[0]

            if (sectionF === id) {
                gsap.to(`#${id}`, {
                    height: "auto",
                    duration: 0.5,
                    ease: "power2.out",
                    opacity: 1
                })
            } else {
                gsap.to(`#${id}`, {
                    height: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    opacity: 1
                })
            }
        })

    }, [sectionF])

    const changeClothesF = (key: string, value: null | string) => {
        let keyObj;

        if (key === "Blusa" || key === "Top") {
            keyObj = "Sup"
        } else if (key === "Pollera" || key === "Pantalon") {
            keyObj = "Inf"
        }

        if (key === "Vestido") {
            setVestimentaF(prev => ({
                ...prev, [key]: value
            }))
        } else if (keyObj) {
            setVestimentaF(prev => ({
                ...prev,
                [keyObj]: value,
                Vestido: null
            }))
        }
    }

    return (
        <div id="dresscodeShe" className='content-center w-full align-self-center min-h-[50dvh] content-end'>
            <div id="selectorShe" className="absolute w-1/2 lg:w-1/5 right-[32px] lg:right-1/4 top-1/6 border z-60 bg-[#00000090] opacity-0 invisible">
                <div className="text-center dressSelector px-1 py-2">
                    <h3 className="font-bold font-(family-name:--fontBold) text-(length:--h5size)">Sugerencias</h3>
                </div>
                <div className="my-1">
                    {modelArray.map((category, i) => {
                        const categoryName = Object.keys(category)[0];

                        const options = category[categoryName as keyof typeof category];

                        return (
                            <div key={i}>
                                <button
                                    onClick={() => setSectionF(prev => prev === categoryName ? null : categoryName)}
                                    className="flex justify-between w-full px-1 text-white"
                                >
                                    <h3 className="font-bold font-(family-name:--fontSemiBold) text-(length:--psize)">{categoryName}</h3>
                                    <div className="relative w-[4vw] self-center">
                                        <span className="block w-[4vw] max-w-6">
                                            <Image
                                                src={minus}
                                                alt=""
                                            />
                                        </span>
                                        <span className={`absolute top-0 left-0 w-[4vw] max-w-6 lg:w-auto minus ${sectionF === categoryName && "active"}`}>
                                            <Image
                                                src={minus}
                                                alt=""
                                            />
                                        </span>
                                    </div>
                                </button>
                                <div id={categoryName} className="h-0 overflow-hidden">
                                    {options &&
                                        options.map((option) => (
                                            <button
                                                className="w-full text-left my-[2px] text-white font-(family-name:--fontNormal) text-(length:--psize) px-2"
                                                onClick={() => changeClothesF(categoryName, option.url)}
                                                key={option.name}
                                            >
                                                {option.name}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

            <div id="showcase" className="w-full h-full flex justify-end md:aspect-7/5 relative"

            >
                {select &&
                    <div className={`absolute left-0 w-full md:w-1/2 md:left-auto md:right-0 text-center my-2 animate-[bounce_2s_infinite] text-white`}>
                        <p>Selecciona tu estilo</p>
                        <p>▼</p>
                    </div>
                }
                <div id="maniquiShe" className="h-full w-full md:w-1/2 relative content-center max-w-125 justify-items-center md:mt-8"
                    onClick={() => {
                        widthOpposite("She", "He");
                        setSelect(false);
                    }}
                >
                    <Image
                        src={maniqui}
                        alt=""
                        className="w-full h-auto md:w-auto md:h-full z-30"
                        loading="eager"
                    />

                    {!vestimentaF.Vestido && vestimentaF.Sup && vestimentaF.Inf &&
                        <>
                            <Image
                                src={vestimentaF.Sup}
                                alt=""
                                className="w-full h-auto md:w-auto md:h-full absolute top-1/2 left-1/2 -translate-1/2 left-0 z-41"
                                loading="eager"
                                width={80}
                                height={80}
                            />
                            <Image
                                src={vestimentaF.Inf}
                                alt=""
                                className="w-full h-auto md:w-auto md:h-full absolute top-1/2 left-1/2 -translate-1/2 left-0 z-43"
                                loading="eager"
                                width={80}
                                height={80}
                            />
                        </>
                    }
                    {vestimentaF.Vestido &&
                        <Image
                            src={vestimentaF.Vestido}
                            alt=""
                            className="w-full h-auto md:w-auto md:h-full absolute top-1/2 left-1/2 -translate-1/2 left-0 z-42"
                            loading="eager"
                            width={80}
                            height={80}
                        />
                    }

                </div>
            </div>
        </div >
    )
}
