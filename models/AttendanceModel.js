"use strict";

module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "attendance" }
  );

  Attendance.associate = function (models) {
    Attendance.hasMany(models.AttendanceRecord, {
      foreignKey: "attendance_id",
    });
  };

  return Attendance;
};
