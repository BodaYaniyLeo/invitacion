interface Props {
    icon: string;
    className: string;
}

export function IconAcc({ icon, className }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14" className={className}>
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                {
                    icon === "corbata"
                        ? <>
                            <path fill="none" stroke="currentColor" d="M8.5 3.5h-3l-.561-1.684A1 1 0 0 1 5.887.5h2.226a1 1 0 0 1 .948 1.316zm0 0l1 7.5L7 13.5L4.5 11l1-7.5" />
                        </>
                        : <>
                            <path d="M7 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4" /><path d="m6.5 8.94l-4.75 1.23a1 1 0 0 1-1.25-1V4.79a1 1 0 0 1 1.25-1L6.5 5.06m1 3.88l4.75 1.23a1 1 0 0 0 1.25-1V4.79a1 1 0 0 0-1.25-1L7.5 5.06" />
                        </>
                }
            </g>
        </svg>
    );
}