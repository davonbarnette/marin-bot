import {CURRENCY_TO_EMOTE, ISaleListing} from "../../../api/Sale.listings/Sale.listings.types";
import {IStrapiEntity} from "../../../api/Base/Base.types";
import {IPrint} from "../../../api/Prints/Prints.types";
import "./styles.scss";
import {Box, Divider, Text, Code, Badge, Stack, Group, Button} from "@mantine/core";
import NumberUtils from "../../../utils/number.utils";
import {Copy, Wallet} from "tabler-icons-react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {showNotification} from "@mantine/notifications";

interface Props {
    saleListing: IStrapiEntity<ISaleListing>
    print: IStrapiEntity<IPrint>
}

function SaleListingsCard({saleListing, print}: Props) {

    const {
        removedAt, quantity, listingDiscordUserId, currency, soldAt
    } = saleListing.attributes;
    const {
        anime, imageUrl, edition, condition, printNumber, name, code,
        grabbedAfter, dropCondition, droppedOn, loggedTime
    } = print.attributes;

    function getPrintGradient() {
        if (printNumber < 10) {
            return {from: 'orange', to: 'red'}
        } else if (printNumber < 100) {
            return {from: '#ed6ea0', to: '#ec8c69', deg: 35}
        } else if (printNumber < 1000) {
            return {from: 'teal', to: 'lime', deg: 105};
        } else {
            return {from: 'indigo', to: 'cyan'};
        }
    }

    return (
        <Stack className="sale-listing-card" sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            textAlign: 'center',
            borderRadius: theme.radius.md,
            position: 'relative',
        })}>
            <div className='image'>
                <img alt="card-image" src={imageUrl}/>
            </div>
            <Stack spacing={0} style={{padding: "0 18px"}}>
                <Group align="center" position="apart">
                    <Text lineClamp={1} color="white" weight={600}>{name}</Text>
                </Group>
                <Group style={{marginBottom:12}}>
                    <Text color="gray" lineClamp={1} size="sm">
                        {anime}
                    </Text>
                </Group>
                <Group align="center" direction="row" position="left" spacing="xs" style={{marginBottom: 12}}>
                    <Badge className="print-number" variant="gradient"
                           gradient={getPrintGradient()}>
                        #{printNumber}
                    </Badge>
                    <Badge color="indigo" variant="filled">◈{edition}</Badge>
                    <Badge color="indigo" variant="filled">SSS</Badge>
                </Group>
                <Group position="apart">
                    <Group className="cost" spacing={0}>
                        <Text color="white" size="xl">{NumberUtils.numberWithCommas(quantity)}</Text>
                        <img alt={currency} src={CURRENCY_TO_EMOTE[currency]}/>
                    </Group>
                    <Button leftIcon={<Wallet/>} size="xs">
                        Buy
                    </Button>
                </Group>
            </Stack>
            <Group style={{borderTop: "1px solid #222222"}} position="apart" sx={theme => ({
                padding: theme.spacing.md
            })}>
                <Stack spacing={3} align="left">
                    <Text align="left" color="gray" size="xs">
                        Lister
                    </Text>
                    <Group spacing={3}>
                        <Code>{listingDiscordUserId}</Code>
                        <CopyToClipboard text={listingDiscordUserId}>
                            <Copy className='copy-button' color="white" size={18} onClick={() =>
                                showNotification({
                                    title: 'Copied!',
                                    message: <span>The Lister <b>{listingDiscordUserId}</b> has been copied to your clipboard!</span>,
                                    color: "green"
                                })}/>
                        </CopyToClipboard>
                    </Group>
                    <Text color="white" size="xs">


                    </Text>
                </Stack>
                <Stack spacing={3} align="right">
                    <Text align="right" color="gray" size="xs">
                        Card Code
                    </Text>
                    <Text color="white" size="xs">
                        <Group spacing={3}>
                            <Code>{code}</Code>
                            <CopyToClipboard text={code}>
                                <Copy className='copy-button' color="white" size={18} onClick={() =>
                                    showNotification({
                                        title: 'Copied!',
                                        message: <span>Code <b>{code}</b> has been copied to your clipboard!</span>,
                                        color: "green"
                                    })}/>
                            </CopyToClipboard>
                        </Group>
                    </Text>
                </Stack>
            </Group>
        </Stack>
    )
}

export default SaleListingsCard;