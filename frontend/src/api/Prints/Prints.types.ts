export interface IPrint {
    name:string,
    condition:EConditions,
    anime: string,
    edition: number,
    printNumber:number,
    code:string,
}

export enum EConditions {
    Mint = "mint",
    Excellent = "excellent",
    Good = "good",
    Poor = "poor",
    Damaged = "damaged",
}