import React from 'react';
import {TextInput, Button, Group, Box, Grid, Select} from '@mantine/core';
import {useForm} from '@mantine/form';
import {EConditions} from "../../../api/Prints/Prints.types";

interface Props {
    onSubmitQuery?: (query: any) => void,
    initialValues?: any
}

interface FormValues {
    name: string,
    condition: string,
    anime: string,
    edition: string,
}

function SaleListingsFilter({onSubmitQuery, initialValues}: Props) {
    const form = useForm<FormValues>({
        initialValues: initialValues || {
            name: "",
            condition: "",
            anime: "",
            edition: ""
        }
    });

    function onSubmit(values: typeof form.values) {
        if (onSubmitQuery){
            onSubmitQuery(values)
        }
    }

    function getConditions(){
        return Object.keys(EConditions).map(key => ({ value: (EConditions as any)[key], label: key }))
    }

    return (
        <div className='sale-listings-filters'>
            <Box mx="auto">
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Grid>
                        <Grid.Col sm={6} lg={3}>
                            <TextInput
                                label="Character Name"
                                placeholder="Character Name"
                                {...form.getInputProps('name')}
                            />
                        </Grid.Col>
                        <Grid.Col sm={6} lg={3}>
                            <TextInput
                                label="Anime"
                                placeholder="Anime Name"
                                {...form.getInputProps('anime')}
                            />
                        </Grid.Col>
                        <Grid.Col sm={6} lg={3}>
                            <Select
                                data={getConditions()}
                                label="Condition"
                                placeholder="Condition"
                                clearable
                                {...form.getInputProps('condition')}/>
                        </Grid.Col>
                        <Grid.Col sm={6} lg={3}>
                            <Select
                                data={["1", "2", "3", "4"]}
                                label="Edition"
                                placeholder="Edition"
                                clearable
                                {...form.getInputProps('edition')}/>
                        </Grid.Col>
                    </Grid>
                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </div>
    )
}

export default SaleListingsFilter;