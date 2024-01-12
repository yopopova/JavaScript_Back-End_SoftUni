const router = require('express').Router();
const courseService = require('../services/courseService');

router.get('/', async (req, res) => {
    const courses = await courseService.getAll().lean();
    const reversedCourses = courses.reverse();
    const lastThreeCourses = reversedCourses.slice(0, 3);
    // const ifCourses = lastThreeCourses.length > 0 ? true : false;
    // console.log(lastThreeCourses);

    res.render('home', lastThreeCourses);
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;