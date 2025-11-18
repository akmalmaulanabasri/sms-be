const db = require("../models/Index");

const index = async (req, res) => {
  try {
    const students = await db.Student.findAll({
      include: [{ model: db.Classroom, as: "class" }],
    });
    return res.status(200).json({ status: "success", results: students });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await db.Student.findByPk(id, {
      include: [{ model: db.Classroom, as: "class" }],
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    return res.status(200).json({ status: "success", results: student });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
  try {
    const payload = req.body;
    const student = await db.Student.create(payload);
    return res.status(201).json({ status: "success", results: student });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const student = await db.Student.findByPk(id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    await student.update(payload);
    return res.status(200).json({ status: "success", results: student });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await db.Student.findByPk(id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    await student.destroy();
    return res
      .status(200)
      .json({ status: "success", message: "Student deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { index, show, store, update, destroy };
