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

type choices = {
    selection: number,
    option: number
}

export const Scroll = ({ story }: { story: Array<sections> }) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [answer, setAnswer] = useState<choices[]>([{ selection: 1, option: 1 }])

    const moveTo = (ref: RefObject<HTMLDivElement | null>) => {
        console.log(ref)
        ref.current?.scrollIntoView({ behavior: "smooth" })

    }

    const refs = useRef<Array<HTMLDivElement | null>>([])


    const handleDecision = (next: number, id: number) => {
        setAnswer(prev => {
            const copy = [...prev]
            const i = prev.findIndex(f => f.selection === next)

            if (i !== -1 && next !== undefined) {
                copy[i] = {
                    selection: next,
                    option: id
                }
            } else if (next !== undefined) {
                copy.push({
                    selection: next,
                    option: id
                })
            }
            return copy
        });
    }

    return (
        <>
            {story.map((s, index) => {
                if (index <= currentIndex) {
                    return (
                        <div key={s.section}
                            className='text-center h-screen p-4 flex flex-col'
                            ref={el => { refs.current[index] = el }}
                        >
                            <div className='flex-1 content-center whitespace-pre-wrap'>
                                {s.text[answer[index].option - 1]}
                            </div>
                            <div className='flex justify-between'>
                                {s.choices?.map(c => {
                                    if (answer[index].option * 2 === c.id || (answer[index].option * 2) - 1 === c.id) {
                                        return (
                                            <button
                                                key={c.id}
                                                className='border-1 p-2 rounded-4xl max-w-40'
                                                onClick={() => {
                                                    if (c.next !== undefined) {
                                                        setCurrentIndex(c.next - 1);
                                                        handleDecision(c.next, c.id)
                                                        setTimeout(() => {
                                                            moveTo({ current: refs.current[index + 1] })
                                                        }, 100)
                                                    }
                                                }}
                                            >
                                                {c.text}
                                            </button>
                                        )
                                    }
                                })
                                }
                            </div>
                        </div >
                    )
                }
            })}
        </>
    )
}
