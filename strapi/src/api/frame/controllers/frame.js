'use strict';
const sharp = require("sharp");
const axios = require("axios");
/**
 *  frame controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::frame.frame', ({strapi}) => ({
  async testFrame(ctx) {
    const {frameId, discordImagePath} = ctx.request.body;


  }
}));
