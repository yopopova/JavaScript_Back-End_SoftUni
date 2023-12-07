const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token); // Add token into cookie
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    await authService.regsiter(username, email, password, repeatPassword);

    // TODO: Login automatically
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res. clearCookie('auth');
    res.redirect('/');
});

module.exports = router;