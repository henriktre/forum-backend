
import {Context} from 'koa';
const Boom = require('boom')
import TopicModel from '../../../models/TopicModel';
import MessageModel from '../../../models/MessageModel';
import UserModel from '../../../models/UserModel';



export default {
  createMessage: async(args: any, ctx: Context) => {
    try {
      if (!ctx.state.user) {
        throw Boom.unauthorized('You are not authenticated');
      }
      args.user = ctx.state.user.id;
      const message = await MessageModel.createMessage(args);
      if(!message) {
        throw Boom.unauthorized('You are not allowed to perform this action');
      }
      await TopicModel.insertMessage({
        messageID: message.id,
        id: args.topic,
      });
      const user = await UserModel.findUserByID(ctx.state.user.id);
      message.owner = user
      return message;
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
