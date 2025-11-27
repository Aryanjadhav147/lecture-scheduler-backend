const router = require('express').Router();
const Lecture = require('../models/Lecture');

router.get('/dashboard', async (req, res) => {
    res.json({ msg: "Instructor Dashboard" });
});

router.get('/lectures', async (req, res) => {
    try {
        // .populate() replaces the ID with the actual Course details
        const lectures = await Lecture.find()
            .populate('courseId') 
            .populate('instructorId');
        res.json(lectures);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;