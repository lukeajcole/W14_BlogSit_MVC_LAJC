// const { Model, DataTypes } = require('sequelize');
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Blog extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true    
        }
    },
    date_updated:{
        type: DataTypes.DATE,
        validate: {
            isDate: true    
        }
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
          model: 'user',
          key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
