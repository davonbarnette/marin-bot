const StrapiApi = require("./base");
const Logger = require("../../logger");
const qs = require("qs");

class GachaGamesApiSingleton extends StrapiApi {

    async createGachaGame(data) {
        try {
            let res = await this.axiosInstance.post("/gacha-games", { data });
            return res.data;
        } catch (e) {
            // Remove logging if it's a validation error, because it's most likely due
            // to the UID not allowing entries for the same card code.
            Logger.error("Could not create gacha-games", e.response.data.error);
            return undefined;
        }
    }

    async upsertGachaGame(grabData) {
        try {
            let res = await this.axiosInstance.patch("/gacha-games", {data: grabData});
            return res.data;
        } catch (e) {
            // Remove logging if it's a validation error, because it's most likely due
            // to the UID not allowing entries for the same card code.
            if (e.response.data.error.name !== "ValidationError"){
                Logger.error("Could not create gacha-games", e.response.data.error);
            } else {
                Logger.warn("Already synced card: ", grabData.code);
            }
            return undefined;
        }
    }

    async getGachaGames(rawQuery) {
        let query = qs.stringify(rawQuery)
        try {
            let res = await this.axiosInstance.get(`/gacha-games?${query}`);
            return res.data;
        } catch (e) {
            Logger.error("Could not get gacha-games", e.message);
            return undefined;
        }
    }

    async getGachaGame(printId, rawQuery) {
        let query = qs.stringify(rawQuery)
        try {
            let res = await this.axiosInstance.get(`/gacha-games/${printId}?${query}`);
            return res.data;
        } catch (e) {
            Logger.error("Could not create gacha-games", e.message);
            return undefined;
        }
    }

    async updateGachaGame(printId, data) {
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
            let res = await this.axiosInstance.put(`/gacha-games/${printId}?${query}`, {data});
            return res.data;
        } catch (e) {
            Logger.error("Could not create gacha-games", e.message);
            return undefined;
        }
    }

}

const GachaGamesApi = new GachaGamesApiSingleton();

module.exports = GachaGamesApi;