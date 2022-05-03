import {DropzoneButton} from "../../components/common/Dropzone/Dropzone";
import React, {useState} from "react";
import Papa from "papaparse";
import "./styles.scss";
import LoaderDefault from "../../components/common/Loader.default/Loader.default";
import {EWorkerStat, ISheetRow, transform, transformHeader} from "./Sheet.stats.types";
import {Accordion, Stack} from "@mantine/core";
import WorkerStats from "../../components/project/Worker.stats/Worker.stats";
import CollectionStats from "../../components/project/Collection.stats/Collection.stats";
import WorkerStatsTable from "../../components/project/Worker.stats.table/Worker.stats.table";
import {ChartArcs, ChartBubble, Database} from "tabler-icons-react";

function SheetStats() {
    const [cardData, setCardData] = useState<any>();
    const [loadingData, setLoadingData] = useState(false);

    async function onDrop(file: any) {
        setLoadingData(true);
        Papa.parse(file[0], {
            header: true,
            skipEmptyLines: true,
            transform: transform,
            transformHeader: transformHeader,
            complete: function (results) {
                console.log("results", results.data);
                setCardData(results.data);
                setLoadingData(false);
            },
            error: function () {
                setLoadingData(false);
            }
        });
    }

    if (loadingData) {
        return <LoaderDefault text="Loading..."/>;
    } else if (!cardData) {
        return <DropzoneButton onDrop={onDrop}/>;
    } else {
        let ratingToNumber = Object.keys(EWorkerStat).reverse().map(key => key);
        let filteredCardData = cardData.filter((card:ISheetRow) => {
            let pur = ratingToNumber.indexOf(card.workerPurity);
            let quick = ratingToNumber.indexOf(card.workerQuickness);
            let tough = ratingToNumber.indexOf(card.workerToughness);
            return pur > 3 && quick > 3 && tough < 3;
        })

        return (
            <Stack className='sheet-stats'>
                <CollectionStats cards={cardData}/>
                <Accordion initialItem={0}>
                    <Accordion.Item icon={<ChartBubble/>} label="Worker Stats">
                        <WorkerStats cards={cardData}/>
                    </Accordion.Item>
                    <Accordion.Item icon={<ChartArcs/>} label="Worker Query">
                        <WorkerStatsTable cards={filteredCardData}/>
                    </Accordion.Item>
                </Accordion>
            </Stack>
        )
    }
}

export default SheetStats;