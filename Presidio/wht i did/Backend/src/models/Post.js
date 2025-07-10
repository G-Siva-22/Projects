module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      content: DataTypes.TEXT,
      excerpt: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'draft'
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      published_at: DataTypes.DATE,
      is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    }, {
      tableName: 'posts',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return Post;
  };
  