const mongoose = require('mongoose');
const Boom = require('boom');
import CategoryModel from './CategoryModel';
import UserModel from './UserModel';

const {ObjectId} = mongoose.Schema;

interface TopicInterface {
  id: string,
  category: string,
  timestamp: string,
  user: string
  body: string,
  title: string,
  messages: any,
}

interface TopicMessageInterface {
  id: string,
  messageID: string,
}

const TopicSchema = mongoose.Schema({
  category: {
    type: ObjectId,
  },
  user: {
    type: ObjectId,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  messages: {
    type: [ObjectId],
  },
  created_at: {
      type: Date,
      default: new Date,
  }
});

TopicSchema.statics.createTopic = function(topic: TopicInterface) {
  return new Promise(async (resolve, reject) => {
    try {
      const cat = await CategoryModel.findById(topic.category);
      if(!cat) {
        throw Boom.notFound('Category not found');
      }
      const user = await UserModel.findUserByID(topic.user);
      if(!user) {
        throw Boom.unauthorized('You are not allowed to create a new topic');
      }

      const newTopic = await this.create({
        category: cat._id,
        user: user._id,
        title: topic.title,
        body: topic.body,
      });
      if(!newTopic) {
        throw Boom.badImplementation('Internal server error unable to create user');
      }

      resolve(newTopic);
    }catch(err) {
      if(Boom.isBoom(err)) reject(err);
      reject(Boom.badImplementation('Internal server error'));
    }
  });
}

TopicSchema.statics.findByID = function(id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const topic = await this.findById(id);
      if (!topic) {
        return reject(Boom.conflict('Unable to find topic with by id'));
      }
      // attach messages here
      resolve(topic)
    }catch(err) {
      if(Boom.isBoom(err)) reject(err);
      reject(Boom.badImplementation('Internal server error'));
    }
  });
}


TopicSchema.statics.allByCategory = function(id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const topic = await this.find({category: id}, null, {sort: {created_at: -1}});
      if (!topic) {
        return reject(Boom.conflict('Unable to find topic with by id'));
      }
      // attach messages here
      resolve(topic)
    }catch(err) {
      if(Boom.isBoom(err)) reject(err);
      reject(Boom.badImplementation('Internal server error'));
    }
  });
}

TopicSchema.statics.insertMessage = function(message: TopicMessageInterface) {
  return new Promise(async (resolve, reject) => {
    try {
      const topic = await this.findByID(message.id);
      const update = await this.findByIdAndUpdate(topic._id, {
        $push: {
          messages: message.messageID,
        },
      });

      if (!update) {
        reject(Boom.badImplementation('Internal server error'));
      }

      resolve(update);
    }catch(err) {
      if(Boom.isBoom(err)) reject(err);
      reject(Boom.badImplementation('Internal server error'));
    }
  });
}



export default mongoose.model('TopicModel', TopicSchema, 'topics');
export {
  TopicInterface
};
