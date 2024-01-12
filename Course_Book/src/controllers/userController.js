const router = require('express').Router();
const userService = require('../services/userService');
// const { isAuth } = require('./../middlewares/authMiddleware');
const { extractErrorMsgs } = require('./../utils/errorHandler');

// REGISTER
router.get('/register', (req, res) => {
    res.render('user/register'); // The link comes from folder name and file name.
});

router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        const token = await userService.register({ username, email, password, confirmPassword });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        console.log({ errorMessages });
        res.status(404).render('user/register', { errorMessages });
    }
});


// LOGIN
router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);
        // console.log({ token });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        console.log({ errorMessages });
        res.status(404).render('user/login', { errorMessages });
    }
});


// LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;