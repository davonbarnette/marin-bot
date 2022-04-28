'use strict';

/**
 * sale-listing service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sale-listing.sale-listing');
