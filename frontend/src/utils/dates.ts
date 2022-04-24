import moment from "moment";

export default class DatesUtils {
    static antdRangeToDateStrings(range:moment.Moment[], format = 'YYYY-MM-DD'){
        const [start, end] = range;

        if (!start || !end){
            return undefined;
        } else {
            return [start.format(format), end.format(format)];
        }
    }
    static dateStringsToAntdRange(range:string[]){
        const [start, end] = range;
        return [moment(start), moment(end)];
    }
}