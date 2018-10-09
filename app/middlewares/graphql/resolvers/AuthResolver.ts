const Boom = require('boom');

import CategoryModel from '../../../models/CategoryModel';
import TopicModel from '../../../models/TopicModel';

export default {

  search: async(args:any, ctx: any) => {
    try {
      const topics = await TopicModel.search(args.value);
      const categories = await CategoryModel.search(args.value)
      return {
        category: {
          edges: categories.map((c:any) => ({node:c})),
        },
        topic: {
          edges: topics.map((t:any) => ({node:t})),
        },
      }
    }catch(err) {
      if (!Boom.isBoom(err)) {
        err = Boom.badImplementation('Internal server error');
      }
      ctx.response.status = err.output.statusCode;
      return {
        error: err.output.payload
      };
    }
  }
}
