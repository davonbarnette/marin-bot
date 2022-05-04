import {Group, Pagination, Stack, TextInput} from "@mantine/core";
import {EWorkerStat, ISheetRow} from "../../../containers/Sheet.stats/Sheet.stats.types";
import React, {useState} from "react";
import TableMem from "../../common/Table.mem/Table.mem";
import {WorkerStatsTableConfig} from "./Worker.stats.table.config";
import WorkerStatsTableFilters from "./Worker.stats.table.filters";

interface Props {
    cards: ISheetRow[]
}

function WorkerStatsTable({cards}: Props) {
    const [search, setSearch] = useState("");
    const [sorted, setSorted] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [sortBy, setSortBy] = useState<string>("workerEffort");
    const [reversed, setReversed] = useState(false);
    const [filters, setFilters] = useState();

    function onSort(curSortBy: string) {
        if (sortBy === curSortBy) {
            if (!reversed) {
                setReversed(true);
            } else {
                setSortBy("workerEffort");
                setReversed(false);
            }
        } else {
            setSortBy(curSortBy);
            setReversed(false);
        }
    }

    function onChangePage(page: number) {
        setPage(page)
    }

    function serializeFilters(filters: any) {
        let ret: any = {};
        Object.keys(filters).forEach(key => {
            if (filters[key] === "false" || filters[key] === "true") {
                ret[key] = filters[key] === "true" ? "S" : "F";
            } else if (filters[key] === "none" || filters[key] === "") {
                ret[key] = undefined;
            } else {
                ret[key] = filters[key];
            }
        })
        return ret;
    }

    function getFilteredCards() {
        return cards.filter(card => {
            if (filters) {
                let shouldReturn = true;
                Object.keys(filters).forEach(key => {
                    let value = filters[key];
                    if (value !== undefined) {
                        if (key === "character") {
                            if (!card.character.toLowerCase().includes((value as string).toLowerCase())) {
                                shouldReturn = false;
                            }
                        } else if ((card as any)[key] !== value) {
                            shouldReturn = false;
                        }
                    }
                })
                return shouldReturn;
            } else {
                return true;
            }
        })
    }

    function getCards() {

        let filtered = getFilteredCards();

        let index = page - 1;
        let start = index * pageSize;
        let end = start + pageSize;
        let workerStatsByIndex = Object.values(EWorkerStat).reverse();
        let sorted = filtered.sort((a: any, b: any) => {
            if (sortBy) {
                if (sortBy.includes("worker") && sortBy !== "workerEffort") {
                    return workerStatsByIndex.indexOf(b[sortBy]) - workerStatsByIndex.indexOf(a[sortBy])
                } else if (sortBy === "character") {
                    return b[sortBy].localeCompare(a[sortBy]);
                }
                return b[sortBy] - a[sortBy];
            } else {
                return 0;
            }
        })
        if (reversed) {
            sorted = sorted.reverse();
        }
        return sorted.slice(start, end);
    }

    function getTotalPages() {
        let modulo = getFilteredCards().length % pageSize;
        return (getFilteredCards().length - modulo) / pageSize;
    }

    function onSubmitFilters(values: any) {
        setFilters(serializeFilters(values));
    }

    return (
        <Stack>
            <Group>
                <WorkerStatsTableFilters onSubmit={onSubmitFilters}/>
            </Group>
            <TableMem
                onSort={onSort} sortKey={sortBy} data={getCards()}
                config={WorkerStatsTableConfig()} reversed={reversed}
            />
            {getFilteredCards().length > pageSize &&
            <Pagination total={getTotalPages()} initialPage={1} onChange={onChangePage}/>}
        </Stack>
    )
}

export default WorkerStatsTable;