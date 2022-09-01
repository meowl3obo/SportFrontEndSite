export interface IDict<T> {
    [name: string]: T
}

export interface IStringDict {
    [name: string]: string
}

export interface IThead {
    key: string
    name: string
}

export interface IKeyup {
    altKey: boolean;
    charCode: number;
    ctrlKey: boolean;
    getModifierState(key: string): boolean;
    key: string;
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    which: number;
}

export type TFunc = () => void

export type TInputFunc<T> = (val: T) => void