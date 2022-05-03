import {Route, Routes} from "react-router-dom";
import App from "./App";
import PrintsSearch from "../containers/Prints.search/Prints.search";
import AuthLogin from "../components/common/Auth.login/Auth.login";
import Auth from "../containers/Auth/Auth";
import SaleListingsSearch from "../containers/Sale.listings.search/Sale.listings.search";
import LandingMain from "../containers/Landing.main/Landing.main";
import AuctionListingsSearch from "../containers/Auction.listings.search/Auction.listings.search";
import SheetStats from "../containers/Sheet.stats/Sheet.stats";
import {Error404} from "../components/common/Error.404/Error.404";

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
                <Route path="auction-listings" element={<AuctionListingsSearch/>}>

                </Route>
                <Route path="collection-stats" element={<SheetStats/>}/>
                <Route path="*" element={<Error404/>}/>
            </Route>
        </Routes>
    )

}

export default AppRouting;