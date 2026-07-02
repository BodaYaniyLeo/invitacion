"use client"

import maniquiShe from "@/public/dress/ella.png"
import { DressCodeContainer } from "./DressCodeContainer"


export const DressCodeShe = (props: any) => (
    <DressCodeContainer
        {...props}
        gender="she"
        initialCategories={['vestido', 'superior', 'inferior']}
        maniquiImg={maniquiShe}
    />
)