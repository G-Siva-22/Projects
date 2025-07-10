module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      created_at: DataTypes.DATE,
      is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      tableName: 'comments',
      underscored: true,
      timestamps: false
    });
  
    return Comment;
  };
  