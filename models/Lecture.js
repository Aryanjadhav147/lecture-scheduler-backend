const mongoose = require('mongoose');
const LectureSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // "09:00"
  endTime: { type: String, required: true },   // "10:30"
  topic: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Lecture', LectureSchema);