import {useForm} from "@mantine/form";
import {
    Box,
    Button,
    Checkbox,
    Grid,
    Group,
    Input,
    NumberInput,
    SegmentedControl,
    Stack,
    TextInput,
    Text,
} from "@mantine/core";
import WorkerStatsSegmentedControl from "../Worker.stats.segmented.control/Worker.stats.segmented.control";

interface Props {
    onSubmit: (values:any ) =>void,
}

function WorkerStatsTableFilters({onSubmit}:Props) {

    const form = useForm({
        initialValues: {
            character: "",
            edition: undefined,
            print: undefined,
            workerDropper: undefined,
            workerGrabber: undefined,
            workerQuickness: undefined,
            workerToughness: undefined,
            workerPurity: undefined,
        },
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)} style={{width: "100%"}}>
            <Grid>
                <Grid.Col md={4}>
                    <TextInput
                        label="Character"
                        {...form.getInputProps('character')}
                    />
                </Grid.Col>
                <Grid.Col md={4}>
                    <NumberInput
                        label="Edition"
                        {...form.getInputProps('edition')}
                    />
                </Grid.Col>
                <Grid.Col md={4}>
                    <Stack spacing={0}>
                        <Text size="sm" style={{marginBottom:3}} color="#C1C2C5">Quickness</Text>
                        <WorkerStatsSegmentedControl
                            {...form.getInputProps('workerQuickness')}
                        />
                    </Stack>
                </Grid.Col>
                <Grid.Col md={4}>
                    <Text size="sm" style={{marginBottom:3}} color="#C1C2C5">Toughness</Text>
                    <WorkerStatsSegmentedControl
                        {...form.getInputProps('workerToughness')}
                    />
                </Grid.Col>
                <Grid.Col md={4}>
                    <Text size="sm" style={{marginBottom:3}} color="#C1C2C5">Purity</Text>
                    <WorkerStatsSegmentedControl
                        {...form.getInputProps('workerPurity')}
                    />
                </Grid.Col>
                <Grid.Col md={4}>
                    <Text size="sm" style={{marginBottom:3}} color="#C1C2C5">Grabber</Text>
                    <SegmentedControl
                        data={[
                            {value: "none", label: "None"},
                            {value: "true", label: "True"},
                            {value: "false", label: "False"},
                        ]}
                        {...form.getInputProps('workerGrabber')}
                    />
                </Grid.Col>
                <Grid.Col md={4}>
                    <Text size="sm" style={{marginBottom:3}} color="#C1C2C5">Dropper</Text>
                    <SegmentedControl
                        data={[
                            {value: "none", label: "None"},
                            {value: "true", label: "True"},
                            {value: "false", label: "False"},
                        ]}
                        {...form.getInputProps('workerDropper')}
                    />
                </Grid.Col>
            </Grid>


            <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )

}

export default WorkerStatsTableFilters;