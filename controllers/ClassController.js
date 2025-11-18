const db = require("../models/Index");

const index = async (req, res) => {
  try {
    const classes = await db.Classroom.findAll({
      include: [{ model: db.Teacher, as: "homeroomTeacher" }],
    });
    return res.status(200).json({ status: "success", results: classes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const classroom = await db.Classroom.findByPk(id, {
      include: [{ model: db.Teacher, as: "homeroomTeacher" }],
    });
    if (!classroom) return res.status(404).json({ message: "Class not found" });
    return res.status(200).json({ status: "success", results: classroom });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
  try {
    const payload = req.body;
    const classroom = await db.Classroom.create(payload);
    const result = await db.Classroom.findByPk(classroom.id, {
      include: [{ model: db.Teacher, as: "homeroomTeacher" }],
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
    const classroom = await db.Classroom.findByPk(id);
    if (!classroom) return res.status(404).json({ message: "Class not found" });
    await classroom.update(payload);
    const result = await db.Classroom.findByPk(id, {
      include: [{ model: db.Teacher, as: "homeroomTeacher" }],
    });
    return res.status(200).json({ status: "success", results: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const classroom = await db.Classroom.findByPk(id);
    if (!classroom) return res.status(404).json({ message: "Class not found" });
    await classroom.destroy();
    return res
      .status(200)
      .json({ status: "success", message: "Class deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { index, show, store, update, destroy };
