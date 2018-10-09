import { UserModel } from '../../../models/index';
import TopicModel from '../../../models/TopicModel';
import MessageModel from '../../../models/MessageModel';
import {
  RegisterInterface,
  LoginInterface,
  UserChangeEmail,
  UserChangePassword,
  UserChangeSettings,
} from '../../../models/UserModel'
import {Context} from 'koa';
const bcrypt = require('bcryptjs')
const Boom = require('boom')


function parseSettings(data: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const obj = JSON.parse(data);
      resolve({
        language: obj.language.toString(),
      });
    }catch(err) {
      reject(Boom.badData('Invalid data structure for settings'));
    }
  });
}


export default {

  user: (_: any, ctx: Context) => {
    return {
      username: 'bjartea',
    };
  },

  me: async(_:any, ctx: any) => {
    try{
      if (!ctx.state.user) {
        throw Boom.unauthorized('You are not authenticated');
      }
      const user = await UserModel.findUserByID(ctx.state.user.id, ctx.cacher);
      await UserModel.attachToken(user);
      const topics = await TopicModel.findByUser(ctx.state.user.id);
      const messages = await MessageModel.findByUser(ctx.state.user.id);
      return {
        ...user,
        topics: {
          edges: topics.map((topic:any) => ({node: topic}))
        },
        messages: {
          edges: messages.map((message:any) => ({node: message}))
        },
      }

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



  register: async(args: RegisterInterface, ctx: Context) => {
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

  login: async(args:LoginInterface, ctx: Context) => {
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

  changePassword: async(args: UserChangePassword, ctx: Context) => {
    const data = args;
    try {
      if (!ctx.state.user) {
        throw Boom.unauthorized('You are not authenticated');
      }
      const user = await UserModel.findUserByID(ctx.state.user.id);
      const valid = await bcrypt.compare(data.password, user.password)
      if(!valid) {
        throw Boom.unauthorized('Invalid password');
      }
      if(data.newPassword != data.repeatPassword) {
        throw Boom.badData('Your new passwords does not match');
      }
      const password = await bcrypt.hash(data.newPassword, 10);
      const updatedUser = await UserModel.updateUser(ctx.state.user.id, {
        password,
      });

      return updatedUser;
    }catch(err) {
      if (!Boom.isBoom(err)) {
        err = Boom.badImplementation('Internal server error');
      }
      ctx.response.status = err.output.statusCode;
      return {
        error: err.output.payload
      };
    }
  },
  changeEmail: async(args: UserChangeEmail, ctx: Context) => {
    const data = args;
    try {
      if (!ctx.state.user) {
        throw Boom.unauthorized('You are not authenticated');
      }
      const user = await UserModel.findUserByID(ctx.state.user.id);
      const valid = await bcrypt.compare(data.password, user.password)
      if(!valid) {
        throw Boom.unauthorized('Invalid password');
      }
      const email = data.email
      const updatedUser = await UserModel.updateUser(ctx.state.user.id, {
        email,
      });

      return updatedUser;
    }catch(err) {
      if (!Boom.isBoom(err)) {
        err = Boom.badImplementation('Internal server error');
      }
      ctx.response.status = err.output.statusCode;
      return {
        error: err.output.payload
      };
    }
  },
  changeSettings: async(args: UserChangeSettings, ctx: Context) => {
    const data = args;
    try {
      if (!ctx.state.user) {
        throw Boom.unauthorized('You are not authenticated');
      }
      const settings = await parseSettings(data.settings);
      const updatedUser = await UserModel.updateUser(ctx.state.user.id, {
        settings,
      });

      return updatedUser;
    }catch(err) {
      if (!Boom.isBoom(err)) {
        err = Boom.badImplementation('Internal server error');
      }
      ctx.response.status = err.output.statusCode;
      return {
        error: err.output.payload
      };
    }
  },
}
