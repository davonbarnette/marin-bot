import {Table} from "@mantine/core";
import {IPrint} from "../../../api/Prints/Prints.types";
import {IStrapiEntity} from "../../../api/Base/Base.types";

interface Props {
    prints: IStrapiEntity<IPrint>[]
}

function PrintsTable({prints}: Props) {

    const rows = prints.map((print) => {
        const { code, condition, name, anime, edition, printNumber } = print.attributes;

        return (
            <tr key={print.id}>
                <td style={{fontFamily: "IBM Plex Mono, monospace"}}>#{printNumber}</td>
                <td style={{fontFamily: "IBM Plex Mono, monospace"}}>{code}</td>
                <td>{name}</td>
                <td style={{fontFamily: "IBM Plex Mono, monospace"}}>{edition}</td>
                <td>{condition[0].toUpperCase() + condition.slice(1).toLowerCase()}</td>
                <td>{anime}</td>
            </tr>
        )
    });

    return (
        <Table striped>
            <thead>
            <tr>
                <th>Print</th>
                <th>Code</th>
                <th>Name</th>
                <th>Edition</th>
                <th>Condition</th>
                <th>Anime</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}

export default PrintsTable;