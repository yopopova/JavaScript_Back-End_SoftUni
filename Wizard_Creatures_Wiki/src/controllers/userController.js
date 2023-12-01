const router = require('express').Router();
const userService = require('../services/userService');

// Register
router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    await userService.register({ firstName, lastName, email, password, repeatPassword });
    res.redirect('/users/login');
});

// Login
router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    // console.log({ token });

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
});

module.exports = router;