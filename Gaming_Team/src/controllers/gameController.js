const router = require('express').Router();
const gameService = require('../services/gameService');
// const ownerService = require('../services/ownerService');
const { isAuth } = require('./../middlewares/authMiddleware');
const { extractErrorMsgs } = require('./../utils/errorHandler');

// Visualize CATALOG
router.get('/catalog', async (req, res) => {
    // const games = []; // To check if there is something in the catalog
    const games = await gameService.getAll().lean();

    res.render('games/catalog', { games }); // Here the path comes from the folder
});


// Visualize SEARCH
router.get('/search', async (req, res) => {
    const { name, platform } = req.query;
    const games = await gameService.search(name, platform);
    // console.log(games);

    res.render('games/search', { games }); // Here the path comes from the folder
});


// Visualize CREATE
router.get('/create', isAuth, (req, res) => {
    res.render('games/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, image, price, description, genre, platform } = req.body;
    const payload = { name, image, price, description, genre, platform, owner: req.user };
    // console.log({ payload });

    try {
        await gameService.create(payload);
        res.redirect('/games/catalog');
    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('games/create', { errorMessages });
    }
});


// Visualize DETAILS
router.get('/:gameId/details', async (req, res) => {
    const { gameId } = req.params;
    const game = await gameService.getSingleGame(gameId).lean();
    // console.log(game);

    const { user } = req; // Current logged in user ID. We can replace this part with 'isAuthenticated'
    // console.log(user);
    const { owner } = game; // Owner ID
    // console.log(owner);

    const isOwner = user?._id === owner.toString();
    // console.log(isOwner);

    const isBought = game.boughtBy?.some((buy) => buy?._id.toString() === user?._id);

    res.render('games/details', { game, isOwner, user, isBought });
});


// Visualize BUY
router.get('/:gameId/buy', async (req, res) => {
    const { gameId } = req.params;
    const { _id } = req.user;
    await gameService.addBoughtsToGame(gameId, _id);

    res.redirect(`/games/${gameId}/details`);
});


// Visualize EDIT
router.get('/:gameId/edit', isAuth, async (req, res) => {
    const { gameId } = req.params;
    const game = await gameService.getSingleGame(gameId).lean();

    const gamePlatformMap = {
        '': '-------',
        'PC': 'PC',
        'Nintendo': 'Nintendo',
        'PS4': 'PS4',
        'PS5': 'PS5',
        'XBOX': 'XBOX'
    }

    const gamePlatforms = Object.keys(gamePlatformMap).map(key => ({
        value: key,
        label: gamePlatformMap[key],
        isSelected: game.platform == key
    }));
    // console.log(typeof gamePlatforms);

    res.render('games/edit', { game, gamePlatforms });
});

router.post('/:gameId/edit', isAuth, async (req, res) => {
    const { gameId } = req.params;
    const { name, image, price, description, genre, platform } = req.body;
    const payload = { name, image, price, description, genre, platform };

    await gameService.update(gameId, payload);
    res.redirect(`/games/${gameId}/details`);
});


// Visualize DELETE
router.get('/:gameId/delete', async (req, res) => {
    const { gameId } = req.params;
    await gameService.delete(gameId);

    res.redirect('/games/catalog');
});


module.exports = router;