const router = require('express').Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const bcrypt = require('bcryptjs');

// 1. Add Instructor
router.post('/instructors', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role: 'instructor' });
  await newUser.save();
  res.json(newUser);
});

// 2. Get Instructors
router.get('/instructors', async (req, res) => {
  const instructors = await User.find({ role: 'instructor' });
  res.json(instructors);
});

// 3. Add Course
router.post('/courses', async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json(newCourse);
});

// 4. Get Courses
router.get('/courses', async (req, res) => {
  const courses = await Course.find().populate('instructorId', 'name');
  res.json(courses);
});

// 5. SCHEDULE LECTURE (CORE LOGIC)
router.post('/lectures', async (req, res) => {
  const { courseId, instructorId, date, startTime, endTime, topic } = req.body;

  // Conflict Check: Check if instructor is busy on this DATE
  // Note: Image says "unable to assign him any other lecture on that date".
  // Implementation: Strict Date Check.
  
  const startOfDay = new Date(date);
  startOfDay.setHours(0,0,0,0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23,59,59,999);

  const existingLecture = await Lecture.findOne({
    instructorId,
    date: { $gte: startOfDay, $lte: endOfDay }
  });

  if (existingLecture) {
    return res.status(400).json({ 
      msg: `Conflict! Instructor already has a lecture on ${new Date(date).toDateString()}` 
    });
  }

  const lecture = new Lecture(req.body);
  await lecture.save();
  res.json(lecture);
});

module.exports = router;