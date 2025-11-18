const db = require("../models/Index");

const index = async (req, res) => {
  try {
    const examId = req.params.id;
    const results = await db.ExamResult.findAll({
      include: [{ model: db.ExamSession }],
      where: {},
    });
    return res.status(200).json({ status: "success", results });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { index };
