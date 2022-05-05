const axios = require("axios");
const Logger = require("../../logger");
const JikanBaseApi = require("./base");

class JikanV4APIClass extends JikanBaseApi {

    async getSchedules(day){
        try {
            let res = await this.axiosInstance.get(`/schedules/${day}`);
            return res.data.data;
        } catch (e) {
            Logger.error("Failed to get schedules from Jikan API", e.message);
            return undefined;
        }
    }

}

const JikanV4API = new JikanV4APIClass();

module.exports = JikanV4API;