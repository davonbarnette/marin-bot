export interface IPrint {
    name:string,
    condition:EConditions,
    anime: string,
    edition: number,
    printNumber:number,
    code:string,
    imageUrl:string,
    loggedTime:string,
    grabbedAfter:string,
    droppedOn:string,
    dropCondition:string,
}

export enum EConditions {
    Mint = "mint",
    Excellent = "excellent",
    Good = "good",
    Poor = "poor",
    Damaged = "damaged",
}