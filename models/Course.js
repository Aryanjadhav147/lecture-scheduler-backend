const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  description: String,
  level: { type: String }, // From Image
  image: { type: String }, // From Image
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }] // To track batches
});
module.exports = mongoose.model('Course', CourseSchema);