const db = require("../models/Index");

const index = async (req, res) => {
  try {
    const items = await db.AttendanceDevice.findAll();
    return res.status(200).json({ status: "success", results: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  try {
    const item = await db.AttendanceDevice.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Device not found" });
    return res.status(200).json({ status: "success", results: item });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
  try {
    const payload = req.body;
    const item = await db.AttendanceDevice.create(payload);
    return res.status(201).json({ status: "success", results: item });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const item = await db.AttendanceDevice.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Device not found" });
    await item.update(req.body);
    return res.status(200).json({ status: "success", results: item });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const item = await db.AttendanceDevice.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Device not found" });
    await item.destroy();
    return res.status(200).json({ status: "success", message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { index, show, store, update, destroy };
