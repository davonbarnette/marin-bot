'use strict';

/**
 *  print controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::print.print', ({strapi}) => ({

  async upsert(ctx) {
    const prints = await strapi.entityService.findMany('api::print.print', {
      filters: {
        code: {
          $eq: ctx.request.body.data.code
        }
      }
    });
    if (prints && prints.length === 1) {
      let print = prints[0];
      return await strapi.entityService.update(
        'api::print.print',
        print.id,
        ctx.request.body
      );
    } else {
      return await strapi.entityService.create('api::print.print', ctx.request.body);
    }
  }

}));
