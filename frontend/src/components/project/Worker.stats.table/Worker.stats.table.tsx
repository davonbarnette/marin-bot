import {Group, Input, Stack, Table, Text, TextInput} from "@mantine/core";
import {ISheetRow} from "../../../containers/Sheet.stats/Sheet.stats.types";
import {Check, CircleCheck, CircleX, Copy, X} from "tabler-icons-react";
import {showNotification} from "@mantine/notifications";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useState} from "react";

interface Props {
    cards: ISheetRow[]
}

function WorkerStatsTable({cards}: Props) {
    const [search, setSearch] = useState("");

    const rows = cards.filter(card => card.character.toLowerCase().includes(search.toLowerCase())).map((card) => {
        const {
            code,
            character,
            edition,
            number,
            workerDropper,
            workerGrabber,
            dropQuality,
            workerPurity,
            workerQuickness,
            workerToughness,
        } = card;

        return (
            <tr key={card.code}>
                <td>{character}</td>
                <td style={{fontFamily: "IBM Plex Mono, monospace"}}>#{number}</td>
                <td style={{fontFamily: "IBM Plex Mono, monospace"}}>
                    <Group>
                        <Text style={{fontFamily: "IBM Plex Mono, monospace", fontSize: 14}}>
                            {code}
                        </Text>
                        <CopyToClipboard text={code}>
                            <Copy className='copy-button' size={16} onClick={() =>
                                showNotification({
                                    title: 'Copied!',
                                    message: `The card code ${code} has been copied to your clipboard!`,
                                    color: "green"
                                })}/>
                        </CopyToClipboard>
                    </Group>
                </td>
                <td style={{fontFamily: "IBM Plex Mono, monospace"}}>{edition}</td>
                <td>{dropQuality}</td>
                <td>{workerPurity}</td>
                <td>{workerQuickness}</td>
                <td>{workerToughness}</td>
                <td>
                    <Group>
                        {workerGrabber === "S" ? <Check color="green" size={20}/> : <X color="red" size={20}/>}
                    </Group>
                </td>
                <td>
                    <Group>
                        {workerDropper === "S" ? <Check color="green" size={20}/> : <X color="red" size={20}/>}
                    </Group>
                </td>
            </tr>
        )
    });

    return (
        <Stack>
            <TextInput placeholder="Character Name" onChange={(e:any) => setSearch(e.target.value)}/>
            <Table striped>
                <thead>
                <tr>
                    <th>Character</th>
                    <th>Print</th>
                    <th>Code</th>
                    <th>Edition</th>
                    <th>Drop</th>
                    <th>P</th>
                    <th>Q</th>
                    <th>T</th>
                    <th>G</th>
                    <th>D</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Stack>
    )
}

export default WorkerStatsTable;