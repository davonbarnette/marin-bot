import {IStrapiEntity} from "../../../api/Base/Base.types";
import {ISaleListing} from "../../../api/Sale.listings/Sale.listings.types";
import SaleListingsCard from "./Sale.listings.card";
import {Grid} from "@mantine/core";

interface Props {
    saleListings: IStrapiEntity<ISaleListing>[]
}

function SaleListingsView({saleListings}: Props) {

    return (
        <Grid style={{maxWidth:1300}}>
            {saleListings.map(saleListing => (
                <Grid.Col xs={12} sm={6} lg={4}>
                    <SaleListingsCard saleListing={saleListing} print={saleListing.attributes.print.data}/>
                </Grid.Col>
            ))}
        </Grid>
    )

}

export default SaleListingsView;