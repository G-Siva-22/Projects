module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
      like_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      liked_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'likes',
      underscored: true,
      timestamps: false
    });
  
    return Like;
  };
  