const Boom = require('boom');

import CategoryModel from '../../../models/CategoryModel';
import TopicModel from '../../../models/TopicModel';
import UserModel from '../../../models/UserModel';

export default {

  search: async(args:any, ctx: any) => {
    try {
      const topics = await TopicModel.search(args.value);
      const categories = await CategoryModel.search(args.value)
      return {
        category: {
          edges: categories.map(async (c:any) => {
            return {
              node: c,
            };
          }),
        },
        topic: {
          edges: topics.map(async (c:any) => {
            const mu = await UserModel.findUserByID(c.user, ctx.cacher);
            c.owner = mu;
            return {
              node: c,
            };
          }),
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
