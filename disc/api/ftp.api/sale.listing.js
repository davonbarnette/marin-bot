const StrapiApi = require("./base");
const Logger = require("../../logger");
const qs = require("qs");

class SaleListingsApiSingleton extends StrapiApi {

    async createSaleListing(data) {
        try {
            let res = await this.axiosInstance.post("/sale-listings", {data});
            return res.data;
        } catch (e) {
            // Remove logging if it's a validation error, because it's most likely due
            // to the UID not allowing entries for the same card code.
            Logger.warn("Failed to create Sale Listing", e.message);
            return undefined;
        }
    }

    async getSaleListings(rawQuery) {
        let query = qs.stringify(rawQuery)
        try {
            let res = await this.axiosInstance.get(`/sale-listings?${query}`);
            return res.data;
        } catch (e) {
            Logger.error("Could not get saleListings", e.message);
            return undefined;
        }
    }

    async getSaleListing(saleListingId, rawQuery) {
        let query = qs.stringify(rawQuery)
        try {
            let res = await this.axiosInstance.get(`/sale-listings/${saleListingId}?${query}`);
            return res.data;
        } catch (e) {
            Logger.error("Could not create saleListings", e.message);
            return undefined;
        }
    }

    async updateSaleListing(saleListingId, data) {
        let query = qs.stringify({
            populate: {
                card: {
                    populate: {
                        character: "*",
                        image: "*"
                    }
                }
            }
        })
        try {
            let res = await this.axiosInstance.put(`/sale-listings/${saleListingId}?${query}`, {data});
            return res.data;
        } catch (e) {
            Logger.error("Could not create saleListings", e.message);
            return undefined;
        }
    }

}

const SaleListingsApi = new SaleListingsApiSingleton();

module.exports = SaleListingsApi;