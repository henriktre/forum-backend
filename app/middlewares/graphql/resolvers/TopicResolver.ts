import { UserModel } from '../../../models/index';
import CategoryModel from '../../../models/CategoryModel';
import MessageModel from '../../../models/MessageModel';
import TopicModel, {
  TopicInterface,
} from '../../../models/TopicModel';
import {Context} from 'koa';
const Boom = require('boom')

export default {
  topic: async(args:TopicInterface, ctx: any) => {
    try{
      const topic    = await TopicModel.findById(args.id);
      const cat      = await CategoryModel.findById(args.category);
      const user     = await UserModel.findUserByID(topic.user, ctx.cacher);
      const messages = await MessageModel.getByIDS(topic.messages);

      return {
        id: topic._id,
        category: cat,
        owner: user,
        body: topic.body,
        title: topic.title,
        comments: {edges: messages.map(async(message:any) => {
          const mu = await UserModel.findUserByID(message.user, ctx.cacher);
          message.owner = mu;
          return {node:message};
        })},
        timestamp: topic.created_at,
      };
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

  topics: async(args:TopicInterface, ctx: any) => {
    try{
      const topics = await TopicModel.allByCategory(args.category);
      return {
        edges: topics.map(async (topic:any)=> {
          const cat = await CategoryModel.findById(args.category);
          const user = await UserModel.findUserByID(topic.user, ctx.cacher);
          const topicComments = topic.messages;
          return { node:{
            id: topic._id,
            category: cat,
            owner: user,
            body: topic.body,
            title: topic.title,
            comments: topicComments,
            timestamp: topic.created_at,
          }};
        }),
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

  createTopic: async(args: TopicInterface, ctx: Context) => {
    try {
      if (!ctx.state.user) {
        throw Boom.unauthorized('You are not authenticated');
      }
      args.user = ctx.state.user.id;
      const topic = await TopicModel.createTopic(args);
      if(!topic) {
        throw Boom.unauthorized('You are not allowed to perform this action');
      }
      const user = await UserModel.findUserByID(ctx.state.user.id);
      topic.owner = user

      return topic;
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
