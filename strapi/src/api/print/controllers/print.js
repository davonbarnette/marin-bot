'use strict';

/**
 *  print controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::print.print');
