const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const crypto = await cryptoService.getAll();
    res.render('crypto/catalog', { crypto });
});

router.get('/:cryptoId/details', async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const isOwner = crypto.owner == req.user?._id;
    const isBuyer = crypto.buyers.some(id => id == req.user._id);

    res.render('crypto/details', { crypto, isOwner, isBuyer });
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    await cryptoService.buy(req.user._id, req.params.cryptoId);
    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;

    try {
        await cryptoService.create(req.user._id, cryptoData);
    } catch (error) {
        return res.status(400).render('crypto/create', { error: getErrorMessage(error) });
    }

    res.redirect('/crypto/catalog');
});

module.exports = router;