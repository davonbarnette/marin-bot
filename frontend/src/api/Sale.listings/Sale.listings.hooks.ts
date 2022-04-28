import {useQuery} from "react-query";
import SaleListingsApi from "./Sale.listings.api";

export function useSaleListings(query:any){
    return useQuery(["fetchSaleListings", query], SaleListingsApi.getSaleListings);
}