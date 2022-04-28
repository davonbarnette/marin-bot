import {IStrapiEntity, IStrapiResponse} from "../Base/Base.types";
import {IPrint} from "../Prints/Prints.types";
import Ticket from "../../assets/admission_ticket.png";
import Gem from "../../assets/gem.png";
import MoneyBag from "../../assets/moneybag.png";
import Droplet from "../../assets/droplet.png";

export interface ISaleListing {
    listingDiscordUserId: string,
    currency: ECurrency,
    quantity: number,
    soldAt: string,
    removedAt: string,
    print: IStrapiResponse<IStrapiEntity<IPrint>>,
}

export enum ECurrency {
    Ticket = "ticket",
    Gem = "gem",
    Gold = "gold",
    Droplet = "droplet",
}

export const CURRENCY_TO_EMOTE = {
    [ECurrency.Ticket]: Ticket,
    [ECurrency.Gem]: Gem,
    [ECurrency.Gold]: MoneyBag,
    [ECurrency.Droplet]: Droplet,
}
