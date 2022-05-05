
import LoaderDefault from "../../components/common/Loader.default/Loader.default";
import {Search} from "tabler-icons-react";
import {Box, Divider, Group, Pagination} from "@mantine/core";
import {useState} from "react";
import {useSaleListings} from "../../api/Sale.listings/Sale.listings.hooks";
import SaleListingsFiltersManager from "../../components/project/Sale.listings.filters/Sale.listings.filters.manager";
import SaleListingsView from "../../components/project/Sales.listings.view/Sale.listings.view";
import SaleListingsFilter from "../../components/project/Sale.listings.filters/Sale.listings.filters";


function SaleListingsSearch() {
    const [query, setQuery] = useState<any>(getLocalStorageQuery());
    const [page, setPage] = useState(1);
    const {isLoading, data: saleListings} = useSaleListings({
        filters: {
            ...query,
        },
        populate: ["print"],
        sort: {
            createdAt: "asc"
        },
        pagination: {
            page,
            pageSize: 20
        }
    })

    function onSubmitQuery(values: any) {
        let serializedQuery = SaleListingsFiltersManager
            .setDeserializedValues(values)
            .serializeQuery()
            .setQueryToLocalStorage()
            .setInitialQuerySent()
            .getQsMappedValues();
        setQuery(serializedQuery);
    }

    function getLocalStorageQuery() {
        return SaleListingsFiltersManager
            .getQueryFromLocalStorage()
            .getQsMappedValues();
    }

    function getSaleListingsFiltersInitialValues() {
        return SaleListingsFiltersManager
            .setSerializedValues(
                SaleListingsFiltersManager
                    .getQueryFromLocalStorage()
                    .getValues()
            )
            .deserializeQuery()
            .getValues()
    }

    function onPagination(page: number) {
        setPage(page);
    }

    function renderList() {
        if (isLoading || !saleListings) {
            return <LoaderDefault text="Loading..."/>
        } else {
            return (
                <>
                    <Divider
                        my="xs"
                        variant="dashed"
                        labelPosition="center"
                        label={
                            <>
                                <Search size={12}/>
                                <Box ml={5}>Search results</Box>
                            </>
                        }
                    />
                    <Group style={{width:"100%"}} position="center" align="center">
                        <SaleListingsView saleListings={saleListings.data}/>
                    </Group>
                    <Pagination page={page}
                                style={{marginTop: 12}}
                                onChange={onPagination}
                                total={saleListings.meta.pagination.pageCount}/>
                </>
            )
        }
    }

    return (
        <div>
            <SaleListingsFilter onSubmitQuery={onSubmitQuery} initialValues={getSaleListingsFiltersInitialValues()}/>
            {renderList()}
        </div>
    )
}

export default SaleListingsSearch;