'use strict';

/**
 *  gacha-game controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::gacha-game.gacha-game');
