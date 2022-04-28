import {IStrapiEntity} from "../../../api/Base/Base.types";
import {ISaleListing} from "../../../api/Sale.listings/Sale.listings.types";
import SaleListingsCard from "./Sale.listings.card";
import {Grid} from "@mantine/core";

interface Props {
    saleListings: IStrapiEntity<ISaleListing>[]
}

function SaleListingsView({saleListings}: Props) {

    return (
        <Grid columns={24}>
            {saleListings.map(saleListing => (
                <Grid.Col lg={12} xl={8}>
                    <SaleListingsCard saleListing={saleListing} print={saleListing.attributes.print.data}/>
                </Grid.Col>
            ))}
        </Grid>
    )

}

export default SaleListingsView;