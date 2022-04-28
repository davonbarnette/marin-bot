import axios from "axios";
import qs from "qs";

import {IStrapiEntity, IStrapiResponse} from "../Base/Base.types";
import {ISaleListing} from "./Sale.listings.types";

export default class SaleListingsApi {

    static async getSaleListings({queryKey}: any) {
        //eslint-disable-next-line
        const [_, rawQuery] = queryKey;
        let query = qs.stringify(rawQuery);
        try {
            let res = await axios.get(`/api/sale-listings?${query}`);
            return res.data as IStrapiResponse<IStrapiEntity<ISaleListing>[]>;
        } catch (e:any) {
            console.error('Could not get sale listings: ', e.message);
            return undefined;
        }
    }

}