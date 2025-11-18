const db = require("../models/Index");

const index = async (req, res) => {
  try {
    const rows = await db.TaskSubmission.findAll();
    return res.status(200).json({ status: "success", results: rows });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const show = async (req, res) => {
  try {
    const item = await db.TaskSubmission.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ status: "success", results: item });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const store = async (req, res) => {
  try {
    const item = await db.TaskSubmission.create(req.body);
    return res.status(201).json({ status: "success", results: item });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const update = async (req, res) => {
  try {
    const item = await db.TaskSubmission.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    await item.update(req.body);
    return res.status(200).json({ status: "success", results: item });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const destroy = async (req, res) => {
  try {
    const item = await db.TaskSubmission.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    await item.destroy();
    return res.status(200).json({ status: "success", message: "Deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { index, show, store, update, destroy };
