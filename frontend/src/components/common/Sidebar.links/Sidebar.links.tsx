import React from 'react';
import {PlayCard, ReportMoney, Gavel, Database} from 'tabler-icons-react';
import {ThemeIcon, UnstyledButton, Group, Text} from '@mantine/core';
import {Link, useMatch, useResolvedPath} from "react-router-dom";

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    link: string,
}

function MainLink({icon, color, label, link}: MainLinkProps) {
    let resolved = useResolvedPath(link);
    let match = useMatch({path: resolved.pathname, end: true});

    function getStyles(theme:any) {
        let curTheme:any = {
            display: 'block',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            marginBottom:6,
            '&:last-of-type': {
                marginBottom: 0,
            },
            '&:hover': {
                backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
        }
        if (match){
            curTheme.backgroundColor = theme.colors.dark[6]
        }
        return curTheme;
    }

    return (

        <UnstyledButton
            component={Link}
            to={link}
            sx={getStyles}
        >
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>

    );
}

const data = [
    {icon: <PlayCard size={16}/>, color: 'blue', label: 'Prints', link: "/prints"},
    {icon: <ReportMoney size={16}/>, color: 'teal', label: 'Sale Listings', link: "/sale-listings"},
    {icon: <Gavel size={16}/>, color: 'violet', label: 'Auction Listings', link: "/auction-listings"},
];

export function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label}/>);
    return <div>{links}</div>;
}