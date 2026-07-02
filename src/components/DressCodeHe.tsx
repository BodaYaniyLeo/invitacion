import { DressCodeContainer } from "./DressCodeContainer"
import maniquiHe from "@/public/dress/el.png"

export const DressCodeHe = (props: any) => (
    <DressCodeContainer
        {...props}
        gender="he"
        initialCategories={['camisa', 'accesorios', 'pantalon', 'saco']}
        maniquiImg={maniquiHe}
    />
)