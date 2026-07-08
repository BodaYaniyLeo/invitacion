export type ObjText = {
    sub: string | null;
    text: string | null;
}

export interface transferObj {
    text: string;
    url: string
}

export interface ArrayElements {
    id: number;
    name: string;
    church: boolean;
    guests: guestsObj[];
    yani: ObjText;
    leo: ObjText;
    payment_coverage: number;
    instructionsTransfer: transferObj;
    textInvitation: string;
}

export type guestsObj = {
    id: number;
    name: string;
    lastname: string;
    confirm: boolean;
    transfer: boolean;
    timeConfirm: Date;
    lastTimeConfirm: Date;
    foodPreferents: string;
    pay: boolean;
    phone: number;
    [key: string]: string | number | boolean | Date;
}

export type buttonConfirm = {
    guests: guestsObj[];
    setTextButton: (text: string) => void;
    setAnimateButton: (value: boolean) => void;
    col?: string;
}

export interface typeInfo {
    id: number;
    moment: string;
    time: string;
    place: string;
    url: string;
}

export interface typePay {
    id: string;
    data: Record<string, string>[];
    value: number;
}

export type dataInv = {
    data: ArrayElements,
    infoDate: typeInfo[],
    isDesktop?: boolean | null,
    infoPay: typePay[];
}

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

export interface GuestData {
    id: number;
    confirm: boolean;
    transfer: boolean;
    group: string;
    name: string;
    lastname: string;
    slug: string;
    foodPreferents: string;
}

export interface VideoProps {
    id?: string;
    dataGuest: Array<guestsObj>;
    setDataGuest: React.Dispatch<React.SetStateAction<guestsObj[]>>;
}

export interface PriceProps {
    id?: string;
    data: ArrayElements;
}

export interface FoodProps {
    id: number;
    setDataGuest: React.Dispatch<React.SetStateAction<guestsObj[]>>;
    lastAnswer: string;
}

export interface PayType {
    id: number;
    pay: boolean;
}

export interface DataAdminType {
    group: ArrayElements;
    price: number;
}

export interface SaveButtonParams {
    setTextButton: (text: string) => void;
    setAnimateButton: (value: boolean) => void;
}

export interface PropsSetGroup {
    updateGroupField: <K extends keyof ArrayElements>(key: K, value: ArrayElements[K]) => void;
    groupData: ArrayElements;
    handleSaveGroup: (params: SaveButtonParams) => Promise<void> | void;
}

export interface DataGuestQProps {
    guests: guestsObj[];
    coverage: number;
    payment: PayType[];
    price: number;
    groupName: string;
}

export interface DataGuestAdProps {
    assist: boolean | null;
    transfer: boolean;
    food: string;
}