'use strict';
module.exports = (sequelize, DataTypes) => {
  var Property = sequelize.define('Property', {
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    streetAddress2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  Property.associate = function(models) {
    Property.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Property.belongsTo(models.Device, {
      foreignKey: "deviceId"
    });
  };
  return Property;
};