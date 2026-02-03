"use client"
import { Ref, RefObject, useRef, useState } from 'react'
import './src/styles/tramos.css'

type sections = {
    section: number,
    text: string[],
    choices?: options[]
}

type options = {
    id: number,
    text: string,
    next?: number
}


export const Opacity = ({ story }: { story?: Array<sections> }) => {

    const [nextPage, setNextPage] = useState<number>(0)
    const [section, setSection] = useState<number>(1)
    const [animation, setAnimation] = useState<boolean>(false)

    return (
        <>
            <div
                className='text-center h-screen p-4 flex flex-col relative'
            >
                <div className={`flex-1 content-center whitespace-pre-wrap ${animation && 'opacityAnimated'}`}>
                    {story && story[nextPage].text[section - 1]}
                </div>
                <div
                    className={`flex justify-between absolute bottom-0 left-0 right-0 p-4 max-w-100 ${animation && 'opacityAnimated'}`}
                >
                    {story && story[nextPage].choices?.map((c, i) => {
                        if (section * 2 === c.id || (section * 2) - 1 === c.id) {
                            return (

                                <button
                                    key={c.id}
                                    className={`border-1 p-2 rounded-4xl max-w-40`}
                                    onClick={() => {
                                        setAnimation(true);
                                        setTimeout(() => {
                                            if (c.next !== undefined) {
                                                setNextPage(c.next - 1);
                                                setSection(c.id);
                                            }
                                        }, 1500);
                                        setTimeout(() => {
                                            setAnimation(false);
                                        }, 3000);
                                    }}
                                >
                                    {c.text}
                                </button>
                            )
                        }
                    }
                    )}
                </div>
            </div>
        </>
    )
}
