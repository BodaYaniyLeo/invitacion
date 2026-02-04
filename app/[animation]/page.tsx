import { opacity } from "../opacity";
import { scroll } from "../scroll";


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

const story: Array<sections> = [
    {
        section: 1,
        text: ["Un sobre elegante aparece bajo tu puerta. Tu nombre está escrito a mano.\nEs la invitación al casamiento de Yani y Leo, dentro de tres días. No aclararon el código de vestimenta, solo una frase intrigante: \n\n “Ven tal como sos… o como nunca te animaste a ser.”\n\nSentís una mezcla de emoción y nervios."],
        choices: [
            { id: 1, text: "Elegís un look clásico y elegante", next: 2 },
            { id: 2, text: "Te animás a algo distinto, fuera de lo común", next: 2 }
        ]
    },
    {
        section: 2,
        text: [
            "Llegás al casamiento con un traje impecable. Todo está en armonía: flores blancas, música suave, sonrisas formales. Mientras saludás a los invitados, notás que alguien te observa desde lejos.",
            "Entrás al salón y varias miradas se giran hacia vos. No es desaprobación… es curiosidad. Yani te guiña un ojo desde lejos, claramente aprobando tu elección."
        ],
        choices: [
            { id: 1, text: "Te acercás a esa persona", next: 3 },
            { id: 2, text: "Preferís mantenerte con la gente conocida", next: 3 },
            { id: 3, text: "Vas directo a felicitar a los novios", next: 3 },
            { id: 4, text: "Te mezclás con desconocidos en la barra", next: 3 }
        ]
    },
    {
        section: 3,
        text: [
            "La persona que te miraba resulta ser alguien importante de tu pasado. Mientras saludás a los invitados, notás que alguien te observa desde lejos.",
            "Entre risas y brindis, el casamiento avanza sin sobresaltos. De pronto, el DJ anuncia una sorpresa preparada por los invitados.",
            "Yani te abraza y te susurra: Te pide ayuda con algo urgente. “Este casamiento no sería lo mismo sin vos.”",
            "Entre tragos y charlas, alguien propone un brindis improvisado que no estaba en el guion."

        ],
        choices: [
            { id: 1, text: "Hablar del pasado sin filtros", next: 4 },
            { id: 2, text: "Mantener la charla ligera y cordial", next: 4 },
            { id: 3, text: "Sumarte sin pensarlo", next: 4 },
            { id: 4, text: "Mirar desde la mesa", next: 4 },
            { id: 5, text: "Ayudarla aunque no sabés bien qué es", next: 4 },
            { id: 6, text: "Decirle que ahora no podés", next: 4 },
            { id: 7, text: "Tomar el micrófono", next: 4 },
            { id: 8, text: "Frenar la idea antes de que escale", next: 4 }
        ]
    },
    {
        section: 4,
        text: [
            "El pasado se cierra y algo nuevo empieza.",
            "Queda una sensación de “lo que pudo ser”.",
            "Terminás siendo parte del momento más recordado del casamiento.",
            "Observás todo con calma, satisfecho de no haber intervenido.",
            "Ayudás a salvar el casamiento de un desastre inesperado.",
            "Todo sale bien… pero siempre te preguntás qué pasó después.",
            "Tu brindis se vuelve legendario.",
            "Evitás un escándalo y nadie lo sabe, salvo vos."
        ]
    }
];

const animations: Record<string, React.ComponentType<{ story: Array<sections> }>> = {
    scroll,
    opacity
}

export function generateStaticParams() {
    return [
        { animation: 'scroll' },
        { animation: 'opacity' },
        { animation: 'carousel' },
    ];
}

export default async function Page({ params }: { params: Promise<{ animation: string }> }) {
    const { animation } = await params;

    const AnimationComponent = animations[animation];

    if (!AnimationComponent) return <p>No hay animaciones que mostrar</p>;

    return <AnimationComponent story={story} />

}