import {Group, Text} from "@mantine/core";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Check, Copy, X} from "tabler-icons-react";
import {showNotification} from "@mantine/notifications";
import React from "react";

export const WorkerStatsTableConfig = () => {

    return [
        {id: 'character', title: "Character"},
        {id: 'edition', title: "Ed", render: (ed: number) => (`◈${ed}`)},
        {id: 'number', title: "Print", render: (p: number) => (`#${p}`)},
        {
            id: 'code', title: "Code",
            render: (code: string) => (
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
            )
        },
        {id: "workerEffort", title: "Eff"},
        {
            id: 'workerDropper', title: "Dro",
            render: (workerDropper: string) => (
                <Group>
                    {workerDropper === "S" ? <Check color="green" size={20}/> : <X color="red" size={20}/>}
                </Group>
            )
        },
        {
            id: 'workerGrabber', title: "Gra",
            render: (workerGrabber: string) => (
                <Group>
                    {workerGrabber === "S" ? <Check color="green" size={20}/> : <X color="red" size={20}/>}
                </Group>
            )
        },
        {
            id: 'dropQuality', title: "Qua", render: (quality:number) => {
                let ret = ""
                for (let i = 0; i < 4; i++) {
                    if (i < quality){
                        ret += "★";
                    } else {
                        ret += "☆";
                    }
                }
                return ret;
            }
        },
        {id: 'workerPurity', title: "Pur"},
        {id: 'workerQuickness', title: "Qui"},
        {id: 'workerToughness', title: "Tou"},
    ]
}