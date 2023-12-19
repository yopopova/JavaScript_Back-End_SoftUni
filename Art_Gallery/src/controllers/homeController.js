const router = require('express').Router();
const publicationService = require('../services/publicationService');

router.get('/', async (req, res) => {
    const publications = await publicationService.getAll().lean();
    res.render('home', { publications });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;