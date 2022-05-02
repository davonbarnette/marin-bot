'use strict';

/**
 * gacha-game service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gacha-game.gacha-game');
