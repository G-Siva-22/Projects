module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
    }, {
      tableName: 'post_categories',
      underscored: true,
      timestamps: false
    });
  
    return PostCategory;
  };
  