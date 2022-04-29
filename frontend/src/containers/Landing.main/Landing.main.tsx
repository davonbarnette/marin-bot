import {
    AppShell,
    Box,
    Button, Center,
    Container,
    Grid,
    Group,
    Space,
    Stack,
    Text,
    ThemeIcon,
    Title
} from "@mantine/core";
import React from "react";
import AppHeader from "../../app/App.header";
import {ReactComponent as MarinBlueprint} from "../../assets/marin-blueprint.svg";
import PrintFinder from "../../assets/print-finder-sm.png";
import Listing from "../../assets/listing.png";
import {ReactComponent as Discord} from "../../assets/discord.svg";
import "./styles.scss";
import {ArrowRight, Gavel, PlayCard, ReportMoney} from "tabler-icons-react";
import {useNavigate} from "react-router-dom";

const boxes = [
    {
        title: "Print Finder",
        icon: <PlayCard size={24}/>,
        color: "blue",
        description: "Find any print based on name, anime, condition, and edition.",
        link: "/prints"
    },
    {
        title: "Card Sales",
        icon: <ReportMoney size={24}/>,
        color: "teal",
        description: "List your cards for sale and/or find cards you would like to buy.",
        link: "/sale-listings"
    },
    {
        title: "Auctions",
        icon: <Gavel size={24}/>,
        color: "violet",
        description: "Set the bid or start your bid with an easy-to-use card list feature.",
        link: "/auction-listings"
    },
]

function LandingMain() {
    const navigate = useNavigate();

    function renderBoxes() {
        return boxes.map((box, i) => (
            <Grid.Col key={i} sm={4} style={{padding: 12}}>
                <Box sx={theme => ({
                    textAlign: 'center',
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                })}>
                    <ThemeIcon size="xl" color={box.color} variant="filled" style={{marginBottom: 12}}>
                        {box.icon}
                    </ThemeIcon>
                    <Text color="white" weight={600} transform="uppercase" style={{
                        letterSpacing: "0.1em",
                    }}>
                        {box.title}
                    </Text>
                    <Space h="xs"/>
                    <Text color="gray">{box.description}</Text>
                    <Button style={{marginTop: 16}} color={box.color} rightIcon={<ArrowRight/>}
                            onClick={() => navigate(box.link)}>
                        Go To {box.title}
                    </Button>
                </Box>
            </Grid.Col>
        ))
    }

    return (
        <AppShell padding="md" fixed
                  header={<AppHeader/>}
                  styles={theme => ({
                      main: {
                          padding: "calc(var(--mantine-header-height, 0px)) 0 0 0",
                          backgroundColor:
                              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                      },
                  })}>
            <Container className='landing-container' fluid>
                <Container className="section">
                    <div style={{position: "relative"}}>
                        <Text className='jp-text'>
                            マリンボット
                        </Text>
                        <Group direction="row" position="left"
                               align="flex-start" noWrap
                               className="content-container"
                               style={{
                                   borderBottom: "1px solid #222222",
                                   paddingTop: 60,
                                   borderTop: "none",
                                   paddingBottom: 240,
                               }}>

                            <MarinBlueprint className="marin-blueprint"/>
                            {/*<img alt="marin-full" src={Marin} className='marin-img'/>*/}

                            <Stack justify="flex-start" align="flex-start" spacing={0}>
                                <Text color="white" className="subtitle">
                                    DISCORD
                                </Text>
                                <Title order={1} className="title">
                                    Marin Bot
                                </Title>
                                <Group style={{maxWidth: 500}}>
                                    <Text color="white" style={{margin: "24px 0", lineHeight: "1.7em"}}>
                                        A multi-functional application aimed to make your Karuta-life easier. Marin bot
                                        currently offers a database of 75,000+ cards and commands to
                                        ease the process of selling and auctioning your valuable cards.
                                    </Text>
                                </Group>
                                <Space h="lg"/>
                                <Button fullWidth={false} size="sm" leftIcon={<Discord/>}>
                                    Add Marin Bot
                                </Button>

                            </Stack>
                        </Group>
                        <Group direction="row" position="left"
                               align="flex-start" noWrap
                               className="content-container"
                               style={{
                                   paddingTop: 0,
                                   borderTop: "none",
                                   marginTop: -174,
                               }}>

                            <Stack align="center" justify="flex-start" style={{
                                width: "100%"
                            }}>
                                <Text transform="uppercase"
                                      weight={600}
                                      style={{color: "#FF7777", letterSpacing: "0.1em"}}>
                                    Marin Bot Features
                                </Text>
                                <Box style={{
                                    position: "relative",
                                    overflow: "hidden"
                                }}
                                     sx={theme => ({
                                         borderRadius: theme.radius.md,
                                         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
                                     })}>

                                    <Grid style={{width: "100%", margin: 0}}>
                                        {renderBoxes()}
                                    </Grid>
                                </Box>
                            </Stack>

                        </Group>

                    </div>
                </Container>
                <Container className="section">
                    <Stack className="content-container" style={{paddingTop: 120}}>
                        <Stack justify="center" align="center" spacing={0}>
                            <Text color="white" className="subtitle">
                                AUTOMATED
                            </Text>
                            <Title order={1} className="title" style={{fontSize: 48}}>
                                PRINT FINDER
                            </Title>
                            <Group style={{maxWidth: 500}}>
                                <Text color="white" align="center">
                                    Find almost any card below 100 print in Karuta. Every card that we save from
                                    players is open source and can be viewed by anyone.
                                </Text>
                            </Group>
                            <Space h="lg"/>
                        </Stack>
                        <img style={{width: "100%"}} alt="print-finder" src={PrintFinder}/>
                    </Stack>
                </Container>
                <Container className="section" style={{overflow: "hidden"}}>
                    <Grid className="content-container" style={{paddingTop: 120}}>
                        <Grid.Col md={6}>
                            <Stack justify="flex-start" align="flex-start" spacing={0}>
                                <Text color="white" className="subtitle">
                                    AUCTION / SALE
                                </Text>
                                <Title order={1} className="title" style={{fontSize: 48}}>
                                    Listings
                                </Title>
                                <Group style={{maxWidth: 500}}>
                                    <Text color="white">
                                        List your cards for sale for a direct buy, or list your cards for auction, and
                                        have other players bid for your cards, with only one Discord commands.
                                    </Text>
                                </Group>
                                <Space h="lg"/>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <img style={{width: "100%"}} alt="print-finder" src={Listing}/>
                        </Grid.Col>
                    </Grid>
                </Container>
                <Container className="section">
                    <Center className="content-container" style={{padding: 12, borderTop: "1px solid #222222"}}>
                        <Text color="white">© {new Date().getFullYear()} MarinBot</Text>
                    </Center>
                </Container>
            </Container>
        </AppShell>
    )
}

export default LandingMain;