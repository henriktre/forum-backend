const mongoose = require('mongoose');
const Boom = require('boom');

interface MessageInterface {
  user: string,
  body: string,
};

const {ObjectId} = mongoose.Schema;

const MessageSchema = mongoose.Schema({
  body: {
    type: String,
  },
  created_by: {
    type: ObjectId,
  },
  created_at: {
      type: Date,
      default: new Date,
  }
});

MessageSchema.statics.createMessage = function(message: MessageInterface) {
  return new Promise(async (resolve, reject) => {
    const newCategory = await this.create({
      body: message.body,
      created_by: message.user,
    });
    if(!newCategory) {
      return reject(Boom.badImplementation('Internal server error unable to create message'));
    }
    resolve(newCategory);
  });
}

MessageSchema.statics.getByIDS = function(ids: any) {
  return new Promise(async (resolve, reject) => {
    const messages = await this.find({
      '_id': {
        $in: ids,
      },
    });
    resolve(messages);
  });
}

MessageSchema.statics.getMessage = function(id: string) {
  return new Promise(async (resolve, reject) => {
    const category = await this.findById(id);
    if (!category) {
      return reject(Boom.conflict('Unable to find message with by id'));
    }
    resolve(category)
  });
}

MessageSchema.statics.findByUser = function(id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const message = await this.find({
        created_by: id,
      });
      if (!message) {
        return reject(Boom.conflict('Unable to find messages by user id'));
      }
      // attach messages here
      resolve(message)
    }catch(err) {
      if(Boom.isBoom(err)) reject(err);
      reject(Boom.badImplementation('Internal server error'));
    }
  });
}


export default mongoose.model('MessageModel', MessageSchema, 'messages');

export {
  MessageInterface,
};
