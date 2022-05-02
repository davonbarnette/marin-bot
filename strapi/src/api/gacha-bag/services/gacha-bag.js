'use strict';

/**
 * gacha-bag service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gacha-bag.gacha-bag');
