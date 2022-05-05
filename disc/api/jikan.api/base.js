const axios = require("axios")

class JikanBaseApi {

    axiosInstance = axios.create({
        baseURL: `https://api.jikan.moe/v4`
    })

    constructor() {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }
}

module.exports = JikanBaseApi;