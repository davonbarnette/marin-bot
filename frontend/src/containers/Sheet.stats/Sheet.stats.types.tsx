export interface ISheetRow {
    alias: string
    burnValue: number,
    character: string,
    code: string,
    dropQuality: number,
    dropper: string,
    dyeCode: string,
    dyeName: string,
    edition: number,
    fights: number,
    frame: string,
    grabber: string,
    guild: string,
    morphed: boolean,
    number: number,
    obtainedDate: string,
    obtainedTimestamp: number,
    quality: number,
    series: string,
    tag: string,
    trimmed: boolean,
    wishlists: number,
    workerDropper: EWorkerStat
    workerEffort: number,
    workerGrabber: EWorkerStat
    workerPurity: EWorkerStat
    workerQuickness: EWorkerStat
    workerRecoveryDate: string
    workerRecoveryTimestamp: number,
    workerStyle: EWorkerStat
    workerToughness: EWorkerStat
    workerVanity: EWorkerStat
}

export enum EWorkerStat {
    S = "S",
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    F = "F",
}

let CSV_HEADERS_TO_FIELD:Record<string, string> = {
    "dye.code": "dyeCode",
    "dye.name": "dyeName",
    "worker.dropper": "workerDropper",
    "worker.effort": "workerEffort",
    "worker.grabber": "workerGrabber",
    "worker.purity": "workerPurity",
    "worker.quickness": "workerQuickness",
    "worker.recoveryDate": "workerRecoveryDate",
    "worker.recoveryTimestamp": "workerRecoveryTimestamp",
    "worker.style": "workerStyle",
    "worker.toughness": "workerToughness",
    "worker.vanity": "workerVanity",
}

let CSV_HEADERS_NUMBERS = [
    'burnValue',
    'dropQuality',
    'edition',
    'fights',
    'number',
    'quality',
    'obtainedTimestamp',
    'wishlists',
    'workerEffort',
    'workerRecoveryTimestamp'
]

let CSV_HEADERS_BOOLEANS = [
    'morphed',
    'trimmed',
]

export function transformHeader(header:string, index:number){
    if (CSV_HEADERS_TO_FIELD[header]){
        return CSV_HEADERS_TO_FIELD[header];
    } else {
        return header;
    }
}

export function transform(value:any, header:string){

    if (CSV_HEADERS_BOOLEANS.indexOf(header)!== -1){
        return value.toLowerCase() === "yes";
    } else if (CSV_HEADERS_NUMBERS.indexOf(header)!== -1){
        return parseInt(value);
    } else {
        return value;
    }
}