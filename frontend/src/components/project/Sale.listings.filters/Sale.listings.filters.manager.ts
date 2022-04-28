import QueryManager from "../../../utils/QueryManager";
import {getLocalStorageKey} from "../../../settings";

const curLocalStorageKey = getLocalStorageKey("saleListings_filters");

let saleListingFiltersSerializableDates:string[] = [

]

let saleListingFiltersSerializableJoins:string[] = [

]

let qsMap = {
    name: "$containsi",
    anime: "$containsi",
}

class SaleListingsFiltersManagerClass extends QueryManager {}

const SaleListingsFiltersManager = new SaleListingsFiltersManagerClass({
    serializable: {dates: saleListingFiltersSerializableDates, joins: saleListingFiltersSerializableJoins},
    localStorageKey: curLocalStorageKey,
    qsMap
});

export default SaleListingsFiltersManager;