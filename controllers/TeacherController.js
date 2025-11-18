const db = require("../models/Index");

const index = async (req, res) => {
  try {
    const teachers = await db.Teacher.findAll({
      include: [{ model: db.Subject, as: "subjects" }],
    });
    return res.status(200).json({ status: "success", results: teachers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await db.Teacher.findByPk(id, {
      include: [{ model: db.Subject, as: "subjects" }],
    });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    return res.status(200).json({ status: "success", results: teacher });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
  try {
    const payload = req.body;
    const subjects = Array.isArray(payload.subjects) ? payload.subjects : null;
    // remove subjects key passed to teacher model
    const createPayload = { ...payload };
    if (createPayload.subjects) delete createPayload.subjects;

    const teacher = await db.Teacher.create(createPayload);

    // assign subjects if provided (many-to-many)
    if (subjects && subjects.length) {
      // use Sequelize association method; this will set the pivot entries
      await teacher.setSubjects(subjects);
    }

    // reload with subjects
    const result = await db.Teacher.findByPk(teacher.id, {
      include: [{ model: db.Subject, as: "subjects" }],
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
    const teacher = await db.Teacher.findByPk(id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    const subjects = Array.isArray(payload.subjects) ? payload.subjects : null;
    const updatePayload = { ...payload };
    if (updatePayload.subjects) delete updatePayload.subjects;

    await teacher.update(updatePayload);

    // handle subject assignments via many-to-many set
    if (subjects) {
      await teacher.setSubjects(subjects);
    }

    const result = await db.Teacher.findByPk(id, {
      include: [{ model: db.Subject, as: "subjects" }],
    });
    return res.status(200).json({ status: "success", results: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await db.Teacher.findByPk(id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    await teacher.destroy();
    return res
      .status(200)
      .json({ status: "success", message: "Teacher deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { index, show, store, update, destroy };
