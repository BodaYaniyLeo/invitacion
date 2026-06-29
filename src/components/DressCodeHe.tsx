"use client"

import { useEffect, useState } from "react"
import { gsap } from 'gsap'
import Image, { StaticImageData } from "next/image"
import minus from "@/public/dress/minus.png"

import maniqui from "@/public/dress/el.png"

import '@/src/styles/invitation.css'

interface timeline {
    [key: string]: gsap.core.Timeline | null,
    church: gsap.core.Timeline | null,
    martini: gsap.core.Timeline | null,
    ring: gsap.core.Timeline | null,
    music: gsap.core.Timeline | null
}

interface Option {
    name: string,
    url: string | null
}

interface Category {
    [key: string]: Option[];
}

interface arrayType {
    Camisa?: Array<Option>;
    Corbata?: Array<Option>;
    Mono?: Array<Option>;
    Pantalon?: Array<Option>;
    Saco?: Array<Option>;
}

interface VestimentaM {
    Camisa: null | string;
    Saco: null | string;
    Pantalon: null | string;
    Accesorios: null | string;
}

interface DressProps {
    widthOpposite: (idSelected: string, idNoSelected: string) => void;
    select: boolean,
    setSelect: (value: boolean) => void
}

const imageContext = (require as any).context('../../public/dress/he', true, /\.png$/);

export const DressCodeHe = ({
    widthOpposite,
    select,
    setSelect
}: DressProps) => {

    const imageNames = imageContext.keys();

    const [modelArray, setModelArray] = useState<Array<arrayType>>([])
    const [categories, setCategories] = useState(['camisa', 'corbata', 'mono', 'pantalon', 'saco'])

    useEffect(() => {
        let temporalEl: Array<arrayType> = [];

        categories.forEach(cat => {
            const capCat = cat.charAt(0).toUpperCase() + cat.slice(1);
            let imgList: Array<Option> = [];

            imageNames.forEach((data: string) => {
                if (data.includes(cat)) {
                    const route = data.slice(2)
                    const nameEl = data.slice(data.search(/[A-Z]/)).replace('.png', '');

                    imgList.push({
                        url: "/dress/he/" + route,
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

    console.log(modelArray)

    const [vestimentaM, setVestimentaM] = useState<VestimentaM>({
        Camisa: null,
        Pantalon: null,
        Accesorios: null,
        Saco: null,
    })

    useEffect(() => {
        if (modelArray?.[0]?.Camisa && modelArray?.[3]?.Pantalon && modelArray?.[4]?.Saco) {
            setVestimentaM({
                Camisa: modelArray[0].Camisa[0].url as string,
                Pantalon: modelArray[3].Pantalon[0].url as string,
                Accesorios: null,
                Saco: modelArray[4].Saco[0].url as string,
            })
        }
    }, [modelArray])

    const [sectionM, setSectionM] = useState<string | null>()

    useEffect(() => {
        modelArray.forEach(e => {
            const id = Object.keys(e)[0]

            if (sectionM === id) {
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
    }, [sectionM])

    const changeClothesM = (key: string, value: null | string) => {
        if (key === "Mono" || key === "Corbata") {
            key = "Accesorios"
        }
        setVestimentaM(prev => ({
            ...prev, [key]: value
        }))
    }

    return (
        <div id="dresscodeHe" className='content-center w-full align-self-center min-h-[50dvh] content-end'>
            <div id="selectorHe" className="absolute w-1/2 lg:w-1/5 right-[32px] lg:right-1/4 top-1/6 border z-60 bg-[#00000090] opacity-0 invisible">
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
                                    onClick={() => setSectionM(prev => prev === categoryName ? null : categoryName)}
                                    className="flex justify-between w-full px-1 text-white"
                                >
                                    <h3 className="font-bold font-(family-name:--fontSemiBold) text-(length:--psize) text-white">{categoryName}</h3>
                                    <div className="relative w-[4vw] self-center">
                                        <span className="block w-[4vw] max-w-6">
                                            <Image
                                                src={minus}
                                                alt=""
                                            />
                                        </span>
                                        <span className={`absolute top-0 left-0 w-[4vw] max-w-6 lg:w-auto minus ${sectionM === categoryName && "active"}`}>
                                            <Image
                                                src={minus}
                                                alt=""
                                            />
                                        </span>
                                    </div>
                                </button>
                                <div id={categoryName} className="h-0 overflow-hidden text-white">
                                    {options &&
                                        options.map((option) => (
                                            <button
                                                className="w-full text-left my-[2px] font-(family-name:--fontNormal) text-(length:--psize) px-2 text-white"
                                                onClick={() => changeClothesM(categoryName, option.url)}
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

            <div id="showcase" className="w-full h-full flex justify-start md:aspect-7/5 relative">
                {select &&
                    <div className="absolute left-0 w-full md:w-1/2 text-center my-2 animate-[bounce_2s_infinite] text-white">
                        <p>Selecciona tu estilo</p>
                        <p>▼</p>
                    </div>
                }
                <div id="maniquiHe" className="h-full w-full md:w-1/2 relative content-center max-w-125 justify-items-center md:mt-8"
                    onClick={() => {
                        widthOpposite("He", "She");
                        setSelect(false);
                    }}
                >
                    <Image
                        src={maniqui}
                        alt=""
                        className="w-full h-auto md:w-auto md:h-full z-30"
                        loading="eager"
                    />
                    {vestimentaM.Saco &&
                        vestimentaM.Camisa &&
                        vestimentaM.Pantalon &&
                        <>
                            <Image
                                src={vestimentaM.Saco}
                                alt=""
                                className="w-full h-auto md:w-auto md:h-full absolute top-1/2 left-1/2 -translate-1/2 z-47"
                                loading="eager"
                                width={80}
                                height={80}
                            />
                            <Image
                                src={vestimentaM.Camisa}
                                alt=""
                                className="w-full h-auto md:w-auto md:h-full absolute top-1/2 left-1/2 -translate-1/2 z-44"
                                loading="eager"
                                width={80}
                                height={80}
                            />
                            <Image
                                src={vestimentaM.Pantalon}
                                alt=""
                                className="w-full h-auto md:w-auto md:h-full absolute top-1/2 left-1/2 -translate-1/2 z-45"
                                loading="eager"
                                width={80}
                                height={80}
                            />
                        </>
                    }
                    {vestimentaM.Accesorios &&
                        <Image
                            src={vestimentaM.Accesorios}
                            alt=""
                            className="w-full h-auto md:w-auto md:h-full absolute top-1/2 left-1/2 -translate-1/2 z-46"
                            loading="eager"
                            width={80}
                            height={80}
                        />
                    }
                </div>
            </div>
        </div>
    )
}