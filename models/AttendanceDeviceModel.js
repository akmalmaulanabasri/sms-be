"use strict";

module.exports = (sequelize, DataTypes) => {
  const AttendanceDevice = sequelize.define(
    "AttendanceDevice",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      device_name: { type: DataTypes.STRING(100), allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: true },
      location: { type: DataTypes.STRING(100), allowNull: true },
      status: { type: DataTypes.STRING(20), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "attendance_devices" }
  );

  return AttendanceDevice;
};
