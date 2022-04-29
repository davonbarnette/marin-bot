import {Route, Routes} from "react-router-dom";
import App from "./App";
import PrintsSearch from "../containers/Prints.search/Prints.search";
import AuthLogin from "../components/common/Auth.login/Auth.login";
import Auth from "../containers/Auth/Auth";
import SaleListingsSearch from "../containers/Sale.listings.search/Sale.listings.search";
import LandingMain from "../containers/Landing.main/Landing.main";

function AppRouting() {

    return (
        <Routes>
            <Route path="auth" element={<Auth/>}>
                <Route path="login" element={<AuthLogin/>}/>
            </Route>
            <Route index element={<LandingMain/>}/>
            <Route path="/" element={<App/>}>
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