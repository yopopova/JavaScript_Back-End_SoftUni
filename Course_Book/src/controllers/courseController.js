const router = require('express').Router();
const courseService = require('../services/courseService');
const helpService = require('../services/helpService');
const { isAuth } = require('./../middlewares/authMiddleware');
const { extractErrorMsgs } = require('./../utils/errorHandler');

// Visualize CATALOG
router.get('/catalog', async (req, res) => {
    // const courses = []; // To check if there is something in the gallery
    const courses = await courseService.getAll().lean();

    res.render('courses/catalog', { courses }); // Here the path comes from the folder
});


// Visualize CREATE
router.get('/create', isAuth, (req, res) => {
    res.render('courses/create');
});

router.post('/create', async (req, res) => {
    const { title, type, certificate, image, description, price } = req.body;
    const payload = { title, type, certificate, image, description, price, owner: req.user };
    // console.log({ payload });
    
    try {
        await courseService.create(payload);
        res.redirect('/courses/catalog');
    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('courses/create', { errorMessages });
    }
});


// Visualize DETAILS
router.get('/:courseId/details', async (req, res) => {
    const { courseId } = req.params;
    const course = await courseService.getSingleCourse(courseId).lean();
    // console.log(course);

    const { user } = req; // Current logged in user ID. We can replace this part with 'isAuthenticated'
    // console.log(user);
    const { owner } = course; // Author ID
    // console.log(owner);

    const courseOwner = await helpService.findOwner(owner); // Find the author for every course
    // console.log(courseOwner);

    const isOwner = user?._id === owner.toString();
    // console.log(isOwner);

    const hasSign = course.signUpList?.some((sign) => sign?._id.toString() === user?._id);
    // console.log(hasSign);

    // const signUsersIds = course.signUpList;
    // console.log(signUsersIds);


    res.render('courses/details', { course, courseOwner, user, isOwner, hasSign });
});


// Visualize EDIT
router.get('/:courseId/edit', isAuth, async (req, res) => {
    const { courseId } = req.params;
    const course = await courseService.getSingleCourse(courseId).lean();

    res.render('courses/edit', { course });
});

router.post('/:courseId/edit', async (req, res) => {
    const { courseId } = req.params;
    const { title, type, certificate, image, description, price } = req.body;
    const payload = { title, type, certificate, image, description, price, owner: req.user };

    await courseService.update(courseId, payload);
    res.redirect(`/courses/${courseId}/details`);
});


// Visualize DELETE
router.get('/:courseId/delete', isAuth, async (req, res) => {
    const { courseId } = req.params;
    await courseService.delete(courseId);

    res.redirect('/courses/catalog');
});


// Visualize SHARES
router.get('/:courseId/sign', async (req, res) => {
    const { courseId } = req.params;
    // console.log(courseId);

    const { _id } = req.user;
    // console.log(_id);
    await courseService.addSignUpsToCourse(courseId, _id);

    res.redirect('/');
});


// Visualize PROFILE
router.get('/profile', async (req, res) => {
    const { email } = req.user;

    const { user } = req;
    const userId = user?._id;
    // console.log(userId);

    const myCourses = await courseService.getMyCourses(userId).lean();
    const createdCoursesCount = myCourses.length;
    
    const ifThereAreCourses = myCourses.length > 0 ? true : false;
    // console.log(myCourses);

    res.render('courses/profile', { email, createdCoursesCount, myCourses });
});

module.exports = router;