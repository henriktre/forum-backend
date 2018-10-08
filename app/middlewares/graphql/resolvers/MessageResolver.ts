
import { UserModel } from '../../../models/index';
import {
  RegisterInterface,
  LoginInterface,
} from '../../../models/UserModel'
import {Context} from 'koa';
const bcrypt = require('bcryptjs')
const Boom = require('boom')



export default {

  messages: async(_:any, ctx: Context) => {
    try{
      if (!ctx.state.user) {
        throw Boom.unauthorized('You are not authenticated');
      }
      const user = await UserModel.findUserByID(ctx.state.user.id);
      await UserModel.attachToken(user);

      return user;
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

  message: async(_:any, ctx: Context) => {
    try{
      if (!ctx.state.user) {
        throw Boom.unauthorized('You are not authenticated');
      }
      const user = await UserModel.findUserByID(ctx.state.user.id);
      await UserModel.attachToken(user);

      return user;
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


  createMessage: async(args: RegisterInterface, ctx: Context) => {
    const user = args;
    try {
      user.password = await bcrypt.hash(user.password, 10);
      const registeredUser = await UserModel.createUser(user);
      await UserModel.attachToken(registeredUser);

      return registeredUser;
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

  editMessage: async(args:LoginInterface, ctx: Context) => {
    const {username, password} = args;
    try {
      const user = await UserModel.findUser(username);
      const valid = await bcrypt.compare(password, user.password)
      if(!valid) {
        throw Boom.unauthorized('Invalid password');
      }
      await UserModel.attachToken(user);

      return user;
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
  
  replyToMessage: async(args:LoginInterface, ctx: Context) => {
    const {username, password} = args;
    try {
      const user = await UserModel.findUser(username);
      const valid = await bcrypt.compare(password, user.password)
      if(!valid) {
        throw Boom.unauthorized('Invalid password');
      }
      await UserModel.attachToken(user);

      return user;
    }catch(err) {
      if (Boom.isBoom(err)) {
        ctx.response.status = err.output.statusCode;
        return {
          error: err.output.payload
        };
      }
      return {};
    }
  }
}
