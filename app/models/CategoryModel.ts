const mongoose = require('mongoose');
const Boom = require('boom');

interface CategoryInterface {
  name: string,
  user: string,
};

const {ObjectId} = mongoose.Schema;

const CategorySchema = mongoose.Schema({
  name: {
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

CategorySchema.statics.createCategory = function(category: CategoryInterface) {
  return new Promise(async (resolve, reject) => {
    const exists = await this.findOne({
      name: category.name,
    });
    if (exists) {
      return reject(Boom.conflict('Category with that name is already in use'));
    }
    // Probably find the user here
    const newCategory = await this.create({
      name: category.name,
      created_by: category.user,
    });
    if(!newCategory) {
      return reject(Boom.badImplementation('Internal server error unable to create user'));
    }
  
    resolve(newCategory);
  });
}

CategorySchema.statics.getAll = function() {
  return new Promise(async (resolve, reject) => {
    const categories = await this.find({});
    resolve(categories);
  });
}

CategorySchema.statics.getCategory = function(id: string) {
  return new Promise(async (resolve, reject) => {
    const category = await this.findById(id);
    if (!category) {
      return reject(Boom.conflict('Unable to find user with by id'));
    }
    resolve(category)
  });
}

CategorySchema.index({
  name: 'text',
});
CategorySchema.statics.search = function(val: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const value = this.find({$text: {$search: val}});
      resolve(value);
    }catch(err) {
      if(Boom.isBoom(err)) reject(err);
      reject(Boom.badImplementation('Internal server error'));
    }
  });
}



export default mongoose.model('CategoryModel', CategorySchema, 'categories');

export {
  CategoryInterface,
};
