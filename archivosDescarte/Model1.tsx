// "use client"
// import { useEffect, useRef, useState } from 'react'
// import './src/styles/tramos.css'
// import { ChevronLeft } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// type objText = {
//     initial: string | null,
//     loading: string | null,
//     connect: string | null,
//     system: string | null,
//     boda: string | null,
//     fecha: string | null,
//     estado: string | null,
//     authentication: string | null,
//     name: string | null,
//     lastname: string | null,
//     pending: string | null,
// }

// export const Model1 = () => {

//     const router = useRouter();

//     const [windowW, setWindowW] = useState<number>(0)
//     const [textModel, setTextModel] = useState<string[]>([''])
//     const [textExist, setTextExist] = useState<objText>({
//         initial: null,
//         loading: null,
//         connect: null,
//         system: null,
//         boda: null,
//         fecha: null,
//         estado: null,
//         authentication: null,
//         name: null,
//         lastname: null,
//         pending: null,
//     })


//     const inputName = useRef<HTMLInputElement>(null)
//     const inputLName = useRef(null)

//     const quantityEqual = Math.floor((windowW - 16 <= 400 && windowW > 0 ? windowW - 16 : 400 - 16) / 9.34)
//     const quantityMinus = Math.floor((windowW - 16 <= 400 && windowW > 0 ? windowW - 16 : 400 - 16) / 5.33)

//     const text = {
//         initial: "Initializing invitation protocol...",
//         loading: "Loading event module: BODA - YANI - LEO v2.0",
//         connect: "Establishing secure connection...",
//         system: 'Sistema detectó un evento crítico:',
//         boda: 'Boda Yani & Leo',
//         fecha: 'Fecha: 09/01/2026',
//         estado: 'Estado: Preparando celebración inolvidable',
//         authentication: 'Authentication required to continue.',
//         name: 'Username:',
//         lastname: 'Apellido:',
//         pending: 'Access pending...',
//     }

//     const deletrear = (text: string, section: keyof objText): Promise<void> => {
//         return new Promise((resolve) => {
//             let i = 0

//             setTextModel([])

//             const interval = setInterval(() => {
//                 setTextModel(prev => [...prev, text[i - 1]])
//                 i++

//                 if (i === text.length) {
//                     clearInterval(interval)

//                     setTextExist(prev => ({
//                         ...prev,
//                         [section]: text
//                     }))

//                     resolve()
//                 }
//             }, 20)
//         })
//     }

//     useEffect(() => {
//         setWindowW(window.outerWidth)

//         const orden = async () => {
//             await deletrear(text.initial, 'initial')
//             await deletrear(text.loading, 'loading')
//             await deletrear(text.connect, 'connect')
//             await deletrear(text.system, 'system')
//             await deletrear(text.boda, 'boda')
//             await deletrear(text.fecha, 'fecha')
//             await deletrear(text.estado, 'estado')
//             await deletrear(text.authentication, 'authentication')
//             await deletrear(text.name, 'name')
//             await deletrear(text.lastname, 'lastname')
//             await deletrear(text.pending, 'pending')
//             if (!inputName.current) return
//             inputName.current.focus();
//         }

//         orden()
//     }, [])

//     return (
//         <>
//             <ChevronLeft className='fixed top-0 left-0 z-9 w-8 h-8' onClick={() => router.push(`/`)} />
//             <div className='justify-self-center h-screen p-2'>
//                 <div className='flex flex-col text-green-600 justify-between'>
//                     <div>
//                         <p>
//                             {'='.repeat(quantityEqual)}
//                             <br />Boot sequence initiated..<br />
//                             {'='.repeat(quantityEqual)}
//                         </p>
//                         <p>{textExist.initial && textExist.initial}</p>
//                         <p>{textExist.loading && textExist.loading}</p>
//                         <p>{textExist.connect && textExist.connect}</p>
//                     </div>
//                     <div>
//                         <p>{textExist.connect && '-'.repeat(quantityMinus)}</p>
//                         <p>{textExist.system && textExist.system}</p>
//                         <p>{textExist.boda && textExist.boda}</p>
//                         <p>{textExist.fecha && textExist.fecha}</p>
//                         <p>{textExist.estado && textExist.estado}</p>
//                         <p>{textExist.estado && '-'.repeat(quantityMinus)}</p>
//                     </div>
//                     <div>
//                         <p>{textExist.authentication && textExist.authentication}</p>
//                         {textExist.name &&
//                             <div className='flex'>
//                                 <p>{textExist.name}&nbsp;</p>
//                                 <input name='name' className='px-2' ref={inputName} />
//                             </div>
//                         }
//                         {textExist.lastname &&
//                             < div className='flex'>
//                                 <p>{textExist.lastname}&nbsp;</p>
//                                 <input name='name' className='px-2' ref={inputLName} />
//                             </div>
//                         }
//                     </div>
//                     <p>{textModel.join("")}</p>
//                     <div className={`w-[2] bg-green-900 ${text.initial.length < textModel.length && 'textLineAnimated'}`}></div>
//                 </div >
//             </div >
//         </>
//     )
// }