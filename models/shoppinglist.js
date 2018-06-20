'use strict';
module.exports = (sequelize, DataTypes) => {
  var ShoppingList = sequelize.define('ShoppingList', {
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  ShoppingList.associate = function(models) {
    // associations can be defined here
  };
  return ShoppingList;
};
