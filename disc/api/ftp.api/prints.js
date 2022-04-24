const StrapiApi = require("./base");
const Logger = require("../../logger");
const qs = require("qs");

class PrintsApiSingleton extends StrapiApi {

    async createPrint(grabData) {
        try {
            let res = await this.axiosInstance.post("/prints", {data: grabData});
            return res.data;
        } catch (e) {
            // Remove logging if it's a validation error, because it's most likely due
            // to the UID not allowing entries for the same card code.
            if (e.response.data.error.name !== "ValidationError"){
                Logger.error("Could not create prints", e.response.data.error);
            }
            return undefined;
        }
    }

    async getPrints(rawQuery) {
        let query = qs.stringify(rawQuery)
        try {
            let res = await this.axiosInstance.get(`/prints?${query}`);
            return res.data;
        } catch (e) {
            Logger.error("Could not get prints", e.message);
            return undefined;
        }
    }

    async getPrint(printId, rawQuery) {
        let query = qs.stringify(rawQuery)
        try {
            let res = await this.axiosInstance.get(`/prints/${printId}?${query}`);
            return res.data;
        } catch (e) {
            Logger.error("Could not create prints", e.message);
            return undefined;
        }
    }

    async updatePrint(printId, data) {
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
            let res = await this.axiosInstance.put(`/prints/${printId}?${query}`, {data});
            return res.data;
        } catch (e) {
            Logger.error("Could not create prints", e.message);
            return undefined;
        }
    }

}

const PrintsApi = new PrintsApiSingleton();

module.exports = PrintsApi;