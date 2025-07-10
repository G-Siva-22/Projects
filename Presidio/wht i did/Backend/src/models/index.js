const { Sequelize, DataTypes } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('blogging_platform_db', 'root', 'root1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // disable SQL logging
});

// Import models
const User = require('./User')(sequelize, DataTypes);
const Post = require('./Post')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);
const Like = require('./Like')(sequelize, DataTypes);
const SavedPost = require('./saved_post')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const PostCategory = require('./post_category')(sequelize, DataTypes);

// Associations

// User -> Post (1 to many)
User.hasMany(Post, { foreignKey: 'author_id' });
Post.belongsTo(User, { foreignKey: 'author_id' });

// Post -> Comment (1 to many)
Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

// User -> Comment (1 to many)
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// Post -> Like (1 to many)
Post.hasMany(Like, { foreignKey: 'post_id' });
Like.belongsTo(Post, { foreignKey: 'post_id' });

// User -> Like (1 to many)
User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

// User -> SavedPost (many to many through saved_posts)
User.belongsToMany(Post, { through: SavedPost, foreignKey: 'user_id', otherKey: 'post_id' });
Post.belongsToMany(User, { through: SavedPost, foreignKey: 'post_id', otherKey: 'user_id' });

// Post -> Category (many to many through post_categories)
Post.belongsToMany(Category, { through: PostCategory, foreignKey: 'post_id', otherKey: 'category_id' });
Category.belongsToMany(Post, { through: PostCategory, foreignKey: 'category_id', otherKey: 'post_id' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Post,
  Comment,
  Like,
  SavedPost,
  Category,
  PostCategory,
};
