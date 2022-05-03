import {StatsGrid} from "../../common/Stats.grid/Stats.grid";
import {ISheetRow} from "../../../containers/Sheet.stats/Sheet.stats.types";
import {Contrast2, Flame, Frame, PlayCard} from "tabler-icons-react";

interface Props {
    cards: ISheetRow[]
}

function CollectionStats({ cards }:Props){

    function serializeData(){
        let stats = {
            burnValue: 0,
            morphs:0,
            frames:0,
        }
        cards.forEach(card => {
            stats.burnValue += card.burnValue;
            stats.morphs += card.morphed ? 1 : 0;
            stats.frames += card.frame !== "" ? 1 : 0;
        })
        return [
            {title: "Cards", Icon: PlayCard, value: cards.length},
            {title: "Burn Value", Icon: Flame, value: stats.burnValue},
            {title: "Morphed", Icon: Contrast2, value: stats.morphs},
            {title: "Framed", Icon: Frame, value: stats.frames},
        ] as any;
    }

    return (
        <StatsGrid data={serializeData()}/>
    )

}

export default CollectionStats;