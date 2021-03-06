"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Favorite, {
      through: "UserFavorite",
      as: "favorites",
      foreignKey: "userId"
    });
  };
  return User;
};
