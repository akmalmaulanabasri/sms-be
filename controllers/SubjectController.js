const db = require("../models/Index");

const index = async (req, res) => {
  try {
    const subjects = await db.Subject.findAll({
      include: [{ model: db.Teacher, as: "teachers" }],
    });
    return res.status(200).json({ status: "success", results: subjects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const subject = await db.Subject.findByPk(id, {
      include: [{ model: db.Teacher, as: "teachers" }],
    });
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    return res.status(200).json({ status: "success", results: subject });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
  try {
    const payload = req.body;
    const teachers = Array.isArray(payload.teachers) ? payload.teachers : null;
    const createPayload = { ...payload };
    if (createPayload.teachers) delete createPayload.teachers;

    const subject = await db.Subject.create(createPayload);

    if (teachers && teachers.length) {
      // set many-to-many teachers for this subject
      await subject.setTeachers(teachers);
    }

    const result = await db.Subject.findByPk(subject.id, {
      include: [{ model: db.Teacher, as: "teachers" }],
    });
    return res.status(201).json({ status: "success", results: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const subject = await db.Subject.findByPk(id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    const teachers = Array.isArray(payload.teachers) ? payload.teachers : null;
    const updatePayload = { ...payload };
    if (updatePayload.teachers) delete updatePayload.teachers;

    await subject.update(updatePayload);

    if (teachers) {
      await subject.setTeachers(teachers);
    }

    const result = await db.Subject.findByPk(id, {
      include: [{ model: db.Teacher, as: "teachers" }],
    });
    return res.status(200).json({ status: "success", results: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const subject = await db.Subject.findByPk(id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    await subject.destroy();
    return res
      .status(200)
      .json({ status: "success", message: "Subject deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { index, show, store, update, destroy };
