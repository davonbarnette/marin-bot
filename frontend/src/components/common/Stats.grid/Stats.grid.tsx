import React from 'react';
import {createStyles, Group, Paper, SimpleGrid, Text} from '@mantine/core';
import {
    UserPlus,
    Discount2,
    Receipt2,
    Coin,
    ArrowUpRight,
    ArrowDownRight,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    root: {
        padding: theme.spacing.xl * 1.5,
    },

    value: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));


interface StatsGridProps {
    data: { title: string; Icon: any; value: string; }[];
}

export function StatsGrid({data}: StatsGridProps) {
    const {classes} = useStyles();
    const stats = data.map((stat) => {
        const {Icon} = stat;

        return (
            <Paper p="md" radius="md" key={stat.title}>
                <Group position="apart">
                    <Text size="xs" color="dimmed" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size={22}/>
                </Group>
                <Group align="flex-end" spacing="xs" mt={25}>
                    <Text className={classes.value}>{stat.value}</Text>
                </Group>
            </Paper>
        );
    });
    return (
        <div className={classes.root} style={{padding:0}}>
            <SimpleGrid
                cols={4}
                breakpoints={[
                    {maxWidth: 'md', cols: 2},
                    {maxWidth: 'xs', cols: 1},
                ]}
            >
                {stats}
            </SimpleGrid>
        </div>
    );
}