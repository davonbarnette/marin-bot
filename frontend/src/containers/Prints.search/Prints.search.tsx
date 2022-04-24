import PrintsFilter from "../../components/project/Prints.filters/Prints.filters";
import PrintsList from "../../components/project/Prints.list/Prints.list";
import {usePrints} from "../../api/Prints/Prints.hooks";
import LoaderDefault from "../../components/common/Loader.default/Loader.default";
import {Search} from "tabler-icons-react";
import {Box, Divider, Pagination} from "@mantine/core";
import {useState} from "react";
import PrintsFiltersManager from "../../components/project/Prints.filters/Prints.filters.manager";

function PrintsSearch() {
    const [query, setQuery] = useState<any>(getLocalStorageQuery());
    const [page, setPage] = useState(1);
    const {isLoading, data: prints} = usePrints({
        filters: {
            ...query,
        },
        sort: {
            printNumber: "asc"
        },
        pagination: {
            page,
            pageSize: 20
        }
    })

    function onSubmitQuery(values: any) {
        let serializedQuery = PrintsFiltersManager
            .setDeserializedValues(values)
            .serializeQuery()
            .setQueryToLocalStorage()
            .setInitialQuerySent()
            .getQsMappedValues();
        setQuery(serializedQuery);
    }

    function getLocalStorageQuery() {
        return PrintsFiltersManager
            .getQueryFromLocalStorage()
            .getQsMappedValues();
    }

    function getPrintsFiltersInitialValues() {
        return PrintsFiltersManager
            .setSerializedValues(
                PrintsFiltersManager
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
        if (isLoading || !prints) {
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
                    <PrintsList prints={prints.data}/>
                    <Pagination page={page}
                                style={{marginTop: 12}}
                                onChange={onPagination}
                                total={prints.meta.pagination.pageCount}/>
                </>
            )
        }
    }

    return (
        <div>
            <PrintsFilter onSubmitQuery={onSubmitQuery} initialValues={getPrintsFiltersInitialValues()}/>
            {renderList()}
        </div>
    )
}

export default PrintsSearch;