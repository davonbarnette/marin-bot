if (process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
const express = require('express')
const app = express()
const {PORT, HOST} = process.env;

app.get('/', (req, res) => {
  res.send('Success')
})

app.listen(PORT, () => {
  logger.debug(`Listening at ${HOST}:${PORT || 8080}`)
})

const DiscordConsumerSingleton = require("./consumers/discord");
const commandList = require("./commands.list");
const logger = require("./logger");

// Instantiate application
new DiscordConsumerSingleton(commandList);

