"use strict";

module.exports = (sequelize, DataTypes) => {
  const AttendanceRecord = sequelize.define(
    "AttendanceRecord",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      attendance_id: { type: DataTypes.BIGINT, allowNull: false },
      student_id: { type: DataTypes.BIGINT, allowNull: true },
      teacher_id: { type: DataTypes.BIGINT, allowNull: true },
      time_in: { type: DataTypes.DATE, allowNull: true },
      time_out: { type: DataTypes.DATE, allowNull: true },
      status: { type: DataTypes.STRING(20), allowNull: true },
      method: { type: DataTypes.STRING(30), allowNull: true },
      notes: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "attendance_records" }
  );

  AttendanceRecord.associate = function (models) {
    AttendanceRecord.belongsTo(models.Attendance, {
      foreignKey: "attendance_id",
    });
    AttendanceRecord.belongsTo(models.Student, { foreignKey: "student_id" });
    AttendanceRecord.belongsTo(models.Teacher, { foreignKey: "teacher_id" });
  };

  return AttendanceRecord;
};
