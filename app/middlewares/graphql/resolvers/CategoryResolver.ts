
import {Context} from 'koa';
const Boom = require('boom');

import CategoryModel, {
  CategoryInterface,
} from '../../../models/CategoryModel'
import UserModel from '../../../models/UserModel'



export default {
  categories: async(_:any, ctx: Context) => {
    try{
      const categories = await CategoryModel.getAll();
      return {
        edges: categories.map((cat:any) => ({node:cat})),
      }
    }catch(err) {
      if (Boom.isBoom(err)) {
        ctx.response.status = err.output.statusCode;
        return {
          error: err.output.payload
        };
      }
      return {};
    }
  },

  category: async(args:any, ctx: Context) => {
    try{
      const category = await CategoryModel.findById(args.id);
      return category;
    }catch(err) {
      if (Boom.isBoom(err)) {
        ctx.response.status = err.output.statusCode;
        return {
          error: err.output.payload
        };
      }
      return {};
    }
  },

  createCategory: async(category:CategoryInterface, ctx: Context) => {
    try {
      if (!ctx.state.user) {
        throw Boom.unauthorized('You are not authenticated');
      }

      const user = await UserModel.findUserByID(ctx.state.user.id);
      if (!user) {
        throw Boom.unauthorized('You are not authenticated');
      }

      const cat = await CategoryModel.createCategory({
        user: user.id,
        name: category.name,
      });
      if (!cat) {
        throw Boom.unauthorized('Something went wrong');
      }
      return cat;
    }catch(err) {
      if (Boom.isBoom(err)) {
        ctx.response.status = err.output.statusCode;
        return {
          error: err.output.payload
        };
      }
      return {};
    }
  },

}
