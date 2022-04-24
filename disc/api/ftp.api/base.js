const axios = require("axios")

class StrapiApi {
    axiosInstance = axios.create({
        baseURL: "http://localhost:1337/api"
    })

    constructor() {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }
}

module.exports = StrapiApi;