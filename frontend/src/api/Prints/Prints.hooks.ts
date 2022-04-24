import {useQuery} from "react-query";
import PrintsApi from "./Prints.api";

export function usePrints(query:any){
    return useQuery(["fetchPrints", query], PrintsApi.getPrints);
}