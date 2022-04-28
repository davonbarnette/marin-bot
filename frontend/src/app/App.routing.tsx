import {Navigate, Route, Routes} from "react-router-dom";
import App from "./App";
import PrintsSearch from "../containers/Prints.search/Prints.search";
import AuthLogin from "../components/common/Auth.login/Auth.login";
import Auth from "../containers/Auth/Auth";
import SaleListingsSearch from "../containers/Sale.listings.search/Sale.listings.search";

function AppRouting() {

    return (
        <Routes>
            <Route path="auth" element={<Auth/>}>
                <Route path="login" element={<AuthLogin/>}/>
            </Route>
            <Route path="/" element={<App/>}>
                <Route index element={<Navigate replace to="prints"/>}/>
                <Route path="prints" element={<PrintsSearch/>}>

                </Route>
                <Route path="sale-listings" element={<SaleListingsSearch/>}>

                </Route>
                <Route path="auction-listings" element={<PrintsSearch/>}>

                </Route>
            </Route>
        </Routes>
    )

}

export default AppRouting;