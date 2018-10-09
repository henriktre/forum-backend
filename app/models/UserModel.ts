const mongoose = require('mongoose');
const Boom = require('boom');
const jsonwebtoken = require('jsonwebtoken');

interface RegisterInterface {
  username: string,
  password: string,
  email: string,
};

interface LoginInterface {
  username: string,
  password: string,
};

interface UserInterface {
  _id: string,
  email: string,
  username: string,
  token: string,
  refreshToken: string,
};
interface UserChangeEmail {
  email: string,
  password: string,
}
interface UserChangePassword {
  password: string,
  newPassword: string,
  repeatPassword: string,
}
interface UserChangeSettings {
  settings: string,
}
const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  settings: {
    type: Object,
    default: {
      language: 'en',
    },
  },
  created_at: {
      type: Date,
      default: new Date,
  }
});

UserSchema.statics.createUser = function(user: RegisterInterface) {
  return new Promise(async (resolve, reject) => {
    const exists = await this.findOne({
      username: user.username,
    });
    if (exists) {
      return reject(Boom.conflict('Username already in use'));
    }
    
    const newUser = await this.create({
      username: user.username,
      password: user.password,
      email: user.email,
    });
    if(!newUser) {
      return reject(Boom.badImplementation('Internal server error unable to create user'));
    }
  
    resolve(newUser);
  });
}

UserSchema.statics.findUser = function(username: string) {
  return new Promise(async (resolve, reject) => {
    const user = await this.findOne({
      username,
    });
    if (!user) {
      return reject(Boom.conflict('Unable to find user with that username'));
    }

    resolve(user)
  });
}

UserSchema.statics.updateUser = function(id: string, data: object) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await this.findUserByID(id);
      const update = this.findByIdAndUpdate(user._id, data);
      if(!update) {
        reject(Boom.badImplementation('Unable to update the user'));
      }
      resolve(update);
    }catch(err) {
      if (Boom.isBoom(err)) reject(err);
      reject(Boom.badImplementation('Internal server error'));
    }
  })
}

UserSchema.statics.findUserByID = function(id: string) {
  return new Promise(async (resolve, reject) => {
    try{
      const user = await this.findById(id);
      if (!user) {
        reject(Boom.conflict('Unable to find user with by id'));
      }
      resolve(user)
    }catch(err) {
      reject(Boom.conflict('Unable to find user with by id'));
    }
  });
}

UserSchema.statics.attachToken = function(user: UserInterface){
  return new Promise(async (resolve, reject) => {
    user.token = jsonwebtoken.sign({
        id: user._id,
        email: user.email
      }, 'mysecret', { expiresIn: '30d' })
    resolve(user);
  });
}


export default mongoose.model('UserModel', UserSchema, 'users');
export {
  RegisterInterface,
  LoginInterface,
  UserChangeSettings,
  UserChangeEmail,
  UserChangePassword,
};
