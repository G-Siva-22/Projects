module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      created_at: DataTypes.DATE
    }, {
      tableName: 'categories',
      underscored: true,
      timestamps: false
    });
  
    return Category;
  };
  