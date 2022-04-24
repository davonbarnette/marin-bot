import DatesUtils from "./dates";

export interface Props {
    localStorageKey: string,
    serializable: ISerializable,
    qsMap?: Record<string, string>
}

export interface ISerializable {
    dates: string[],
    joins: string[]
}

export default class QueryManager {

    values: any = {};
    dataIsCurrently?: "serialized" | "deserialized";
    localStorageKey: string;
    serializable: ISerializable = {dates: [], joins: []};
    initialQuerySent: boolean = false;
    qsMap: Record<string, string> = {};

    constructor({serializable, localStorageKey, qsMap}: Props) {
        this.serializable = serializable;
        this.localStorageKey = localStorageKey;
        this.qsMap = qsMap || {};
    }

    getValuesForStrapiQuery() {
        let newValues: any = {...this.values};
        this.serializable.dates.forEach(key => {
            if (newValues[key]) {
                newValues[key + '_gt'] = this.values[key][0];
                newValues[key + '_lt'] = this.values[key][1];
                newValues[key] = undefined;
            }
        })
        return newValues
    }

    setInitialQuerySent(initialQuerySent = true) {
        this.initialQuerySent = true;
        return this;
    }

    getQsMappedValues() {
        let curValues: any = {};
        Object.keys(this.values).forEach(key => {
            if (this.values[key] !== null) {
                if (this.qsMap[key]) {
                    curValues[key] = {
                        [this.qsMap[key]]: this.values[key]
                    }
                } else {
                    curValues[key] = this.values[key]
                }
            }
        })
        return curValues;
    }

    getValues() {
        return this.values;
    }

    setQueryToLocalStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.values));
        return this;
    }

    getQueryFromLocalStorage() {
        let lsValues = localStorage.getItem(this.localStorageKey)
        if (lsValues) {
            this.values = JSON.parse(lsValues);
        }
        return this;
    }

    normalizeDates(type: "serialize" | "deserialize") {
        this.serializable.dates.forEach(key => {
            if (this.values[key]) {
                if (type === "deserialize") {
                    this.values[key] = DatesUtils.dateStringsToAntdRange(this.values[key]);
                } else {
                    this.values[key] = DatesUtils.antdRangeToDateStrings(this.values[key]);
                }
            }
        })
        return this;
    }

    removeEmptyStrings() {
        let ret: any = {};
        Object.keys(this.values).forEach(key => {
            if (this.values[key] !== "") {
                ret[key] = this.values[key];
            }
        })
        this.values = ret;
        return this;
    }

    normalizeJoins(type: "serialize" | "deserialize") {
        this.serializable.joins.forEach(key => {
            if (this.values[key]) {
                if (type === "deserialize") {
                    this.values[key] = this.values[key].split(',')
                } else {
                    this.values[key] = this.values[key].join(',')
                }
            }
        })
        return this;
    }

    setDeserializedValues(values: any) {
        this.values = {...values};
        this.dataIsCurrently = 'deserialized'
        return this;
    }

    setSerializedValues(values: any) {
        this.values = {...values};
        this.dataIsCurrently = 'serialized'
        return this;
    }

    serializeQuery() {
        if (this.dataIsCurrently !== "serialized") {
            this.normalizeDates("serialize")
                .normalizeJoins("serialize")
                .removeEmptyStrings();
            this.dataIsCurrently = "serialized";
        }
        return this;
    }

    deserializeQuery() {
        if (this.dataIsCurrently !== "deserialized") {
            this.normalizeDates("deserialize")
                .normalizeJoins("deserialize");
            this.dataIsCurrently = "deserialized";
        }
        return this;
    }
}