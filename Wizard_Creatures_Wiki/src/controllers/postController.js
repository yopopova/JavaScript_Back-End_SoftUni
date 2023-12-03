const router = require('express').Router();
const creatureService = require('./../services/creatureService');

router.get('/all', async (req, res) => {
    const creatures = await creatureService.getAll().lean();
    console.log({ creatures }); // Like this we can see all creatures in the database in the terminal

    res.render('post/all-posts', { creatures }); // Here the path comes from the folder
});

router.get('/create', (req, res) => {
    res.render('post/create');
});

router.post('/create', async (req, res) => {
    const { name, species, skinColor, eyeColor, image, description } = req.body;
    const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };

    await creatureService.create(payload);
    res.redirect('/posts/all');
});

router.get('/profile', (req, res) => {
    res.render('post/profile');
});

module.exports = router;