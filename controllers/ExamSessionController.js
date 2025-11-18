const db = require("../models/Index");

const store = async (req, res) => {
  try {
    const examId = req.params.id;
    // create exam session for student (req.user may be available)
    const payload = {
      exam_id: examId,
      student_id: req.body.student_id || null,
      started_at: new Date(),
    };
    const session = await db.ExamSession.create(payload);
    return res.status(201).json({ status: "success", results: session });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const finish = async (req, res) => {
  try {
    const examId = req.params.id;
    const session = await db.ExamSession.findOne({
      where: { exam_id: examId, student_id: req.body.student_id },
    });
    if (!session) return res.status(404).json({ message: "Session not found" });
    session.finished_at = new Date();
    await session.save();
    return res.status(200).json({ status: "success", results: session });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { store, finish };
