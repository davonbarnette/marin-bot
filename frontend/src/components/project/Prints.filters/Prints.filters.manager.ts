import QueryManager from "../../../utils/QueryManager";
import {getLocalStorageKey} from "../../../settings";

const curLocalStorageKey = getLocalStorageKey("prints_filters");

let printFiltersSerializableDates:string[] = [

]

let printFiltersSerializableJoins:string[] = [

]

let qsMap = {
    name: "$containsi",
    anime: "$containsi",
}

class PrintsFiltersManagerClass extends QueryManager {}

const PrintsFiltersManager = new PrintsFiltersManagerClass({
    serializable: {dates: printFiltersSerializableDates, joins: printFiltersSerializableJoins},
    localStorageKey: curLocalStorageKey,
    qsMap
});

export default PrintsFiltersManager;