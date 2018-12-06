'use strict';
module.exports = (sequelize, DataTypes) => {
  var Device = sequelize.define('Device', {
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Device.associate = function(models) {
    Device.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return Device;
};