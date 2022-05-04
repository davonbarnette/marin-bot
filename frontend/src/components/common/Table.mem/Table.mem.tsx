import {ChevronDown, ChevronUp, Selector} from "tabler-icons-react";
import {Center, createStyles, Group, Table, Text, UnstyledButton} from "@mantine/core";
import React from "react";
import {ITableMemConfigRow} from "./Table.mem.types";

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },

    control: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
}));


function Th({children, sorted, onSort, reversed}: ThProps) {
    const {classes} = useStyles();
    const Icon = reversed ? ChevronUp : ChevronDown;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group>
                    <Text weight={500} size="sm">
                        {children}
                    </Text>
                    {sorted && <Icon size={14}/>}
                </Group>
            </UnstyledButton>
        </th>
    );
}

interface ThProps {
    children: React.ReactNode;
    sorted: boolean;
    reversed?: boolean;
    onSort(): void;
}

interface Props {
    config: ITableMemConfigRow[],
    onSort: (id: string) => void,
    sortKey: string,
    reversed?: boolean,
    data: any[]
}

function TableMem(props: Props) {
    const {onSort, sortKey, data, config, reversed} = props;

    function renderRows() {
        return data.map((datum, i) => {
            let ret: any = [];
            config.forEach((configRow, j) => {
                let value = datum[configRow.id];
                let render = configRow.render;
                if (render) {
                    ret.push(<td key={j}>{render(value)}</td>);
                } else {
                    ret.push(<td key={j}>{value}</td>)
                }
            })
            return (
                <tr key={i}>
                    {ret}
                </tr>
            )
        })
    }

    function renderHeaders() {
        return config.map((header, index) => {
            let isSorted = sortKey === header.id;
            let props = {
                onSort: () => onSort(header.id),
                sorted: isSorted, key:index, reversed
            }
            if (header.titleRender) {
                return <Th {...props}>{header.titleRender(header.title)}</Th>;
            } else {
                return <Th {...props}>{header.title}</Th>;
            }
        })
    }

    return (
        <Table striped>

            <thead>
            <tr>
                {renderHeaders()}
            </tr>
            </thead>
            <tbody>
            {renderRows()}
            </tbody>
        </Table>
    )
}

export default TableMem;