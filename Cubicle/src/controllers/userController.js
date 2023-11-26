const router = require('express').Router();
const userService = require('../services/userService');

// Register User
router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    console.log({ inputData: req.body });

    const { username, password, repeatPassword } = req.body;
    await userService.register({ username, password, repeatPassword });

    res.redirect('/users/login');
});

// Login User
router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const token = await userService.login(username, password);
    res.cookie('auth', token, { httpOnly: true });

    res.redirect('/');
});

// Logout User
router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;