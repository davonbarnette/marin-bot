import axios from "axios";
import qs from "qs";

import {IStrapiEntity, IStrapiResponse} from "../Base/Base.types";
import {IPrint} from "./Prints.types";

export default class PrintsApi {

    static async getPrints({queryKey}: any) {
        //eslint-disable-next-line
        const [_, rawQuery] = queryKey;
        let query = qs.stringify(rawQuery);
        try {
            let res = await axios.get(`/api/prints?${query}`);
            return res.data as IStrapiResponse<IStrapiEntity<IPrint>[]>;
        } catch (e:any) {
            console.error('Could not get prints: ', e.message);
            return undefined;
        }
    }

}