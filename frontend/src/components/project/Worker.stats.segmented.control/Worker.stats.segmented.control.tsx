import {SegmentedControl, SegmentedControlProps} from "@mantine/core";
import {EWorkerStat} from "../../../containers/Sheet.stats/Sheet.stats.types";

function WorkerStatsSegmentedControl(props: Omit<SegmentedControlProps, "data">){
    function getStats(){
        let ret = Object.keys(EWorkerStat).map(key => ({ label: key, value: key }));
        return [{ label: "None", value: "none" }, ...ret] as any;
    }

    return (
        <SegmentedControl {...props} data={getStats()}/>
    )
}

export default WorkerStatsSegmentedControl;