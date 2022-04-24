import axios from 'axios';
import {QueryClient} from "react-query";

/*** --- APP SETTINGS --- ***/
export const APP_NAME = 'Free The People';
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL
axios.defaults.baseURL = BASE_API_URL;

/*** --- PERMISSIONS SETTINGS --- ***/
export enum ROLES {
    PUBLIC = "Public",
    APPLICATION_ADMINISTRATOR = "Application Administrator",
    HOSPITAL_ADMINISTRATOR = "Hospital Administrator",
    AUTHENTICATED = "Authenticated",
}

/*** --- UI SETTINGS --- ***/
export const TOAST_DURATION = 10;
export const ERROR_TOAST_DURATION = 20;
export const APPLICATION_DISPLAY_NAME = 'Free The People'


/*** --- LOCAL STORAGE SETTINGS --- ***/

export function getLocalStorageKey(key: string) {
    return `${APP_NAME}_${key}`;
}


/*** --- REACT QUERY SETTINGS --- ***/
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
})