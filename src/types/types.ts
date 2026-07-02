export interface Option {
    name: string
    url: string
}

export interface ArrayCategory {
    [key: string]: Option[] | undefined
}

export interface DressProps {
    gender: string;
    initialCategories: string[];
    maniquiImg: any;
    widthOpposite: (idSelected: string, idNoSelected: string) => void;
    select: boolean;
    setSelect: (val: boolean) => void;
    vestimenta: Record<string, string | null>;
    setVestimenta: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
    tono: Record<string, any>;
    setTono: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}