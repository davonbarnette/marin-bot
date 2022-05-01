import React from 'react';
import {createStyles, Container, Title, Text, Button, Group} from '@mantine/core';
import {useNavigate} from "react-router-dom";

interface Props {
    text: string,
}

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    inner: {
        position: 'relative',
    },

    image: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.75,
    },

    content: {
        paddingTop: 220,
        position: 'relative',
        zIndex: 1,

        [theme.fn.smallerThan('sm')]: {
            paddingTop: 120,
        },
    },

    title: {
        fontFamily: `Rubik, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 38,
        color: "white",

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 540,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

export function ComingSoon({text}: Props) {
    const {classes} = useStyles();
    const navigate = useNavigate();

    return (
        <Container className={classes.root}>
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>Coming Soon</Title>
                    <Text color="dimmed" size="lg" align="center" className={classes.description}>
                        {text}
                    </Text>
                    <Group position="center">
                        <Button size="md" onClick={() =>navigate("/")}>Take me back to home page</Button>
                    </Group>
                </div>
            </div>
        </Container>
    );
}