import {CURRENCY_TO_EMOTE, ISaleListing} from "../../../api/Sale.listings/Sale.listings.types";
import {IStrapiEntity} from "../../../api/Base/Base.types";
import {IPrint} from "../../../api/Prints/Prints.types";
import "./styles.scss";
import {Box, Divider, Text, Code, Badge, Stack, Group} from "@mantine/core";
import NumberUtils from "../../../utils/number.utils";
import {Copy} from "tabler-icons-react";
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
        <Box className="sale-listing-card" sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            textAlign: 'center',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.md,
            position: 'relative',
        })}>
            <div className='image'>
                <img alt="card-image" src={imageUrl}/>
            </div>
            <div className="card-details">
                <div className="header">
                    <div className="name">
                        <Text lineClamp={1} color="white">{name}</Text>

                    </div>
                    <div className="cost">
                        <Text color="white">{NumberUtils.numberWithCommas(quantity)}</Text>
                        <img alt={currency} src={CURRENCY_TO_EMOTE[currency]}/>
                    </div>
                </div>
                <Divider my="xs" label={anime} labelPosition="left" style={{width: "100%", margin: "0px 0 9px 0"}}/>
                <Group align="center" direction="row" position="left" spacing="xs" style={{marginBottom:12}}>
                    <Badge className="print-number" variant="gradient"
                           gradient={getPrintGradient()}>
                        #{printNumber}
                    </Badge>
                    <Badge color="indigo" variant="filled">◈{edition}</Badge>
                </Group>
                <Text className="card-details-text" color="white" size="xs">
                    <Code>Code&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Code> {code}
                    <CopyToClipboard text={code}>
                        <Copy className='copy-button' size={16} onClick={() =>
                            showNotification({
                                title: 'Copied!',
                                message: `The card code ${code} has been copied to your clipboard!`,
                                color: "green"
                            })}/>
                    </CopyToClipboard>
                </Text>
                <Text className="card-details-text" color="white" size="xs">
                    <Code>Condition</Code> {condition}
                </Text>
                <Text className="card-details-text" color="white" size="xs">
                    <Code>Dropped&nbsp;&nbsp;</Code> {dropCondition}
                </Text>
                <Text className="card-details-text" color="white" size="xs">
                    <Code>Grabbed&nbsp;&nbsp;</Code> {grabbedAfter} seconds
                </Text>
                <Text className="card-details-text" color="white" size="xs">
                    <Code>Lister&nbsp;&nbsp;&nbsp;</Code> {listingDiscordUserId}
                    <CopyToClipboard text={listingDiscordUserId}>
                        <Copy className='copy-button' size={16} onClick={() =>
                            showNotification({
                                title: 'Copied!',
                                message: <span>The Lister <b>{listingDiscordUserId}</b> has been copied to your clipboard!</span>,
                                color: "green"
                            })}/>
                    </CopyToClipboard>
                </Text>
            </div>
        </Box>
    )
}

export default SaleListingsCard;