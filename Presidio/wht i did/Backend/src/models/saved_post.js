module.exports = (sequelize, DataTypes) => {
    const SavedPost = sequelize.define('SavedPost', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      saved_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'saved_posts',
      underscored: true,
      timestamps: false
    });
  
    return SavedPost;
  };
  