const router = require('express').Router();
const creatureService = require('./../services/creatureService');

router.get('/all', async (req, res) => {
    const creatures = await creatureService.getAll().lean(); // If we don't have 'lean()', we will receive an array and won't add the data correctlly
    // We can check for 'no posts', if we write [] instead of 'await creatureService.getAll().lean()'
    // console.log({ creatures }); // Like this we can see all creatures in the database in the terminal

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

router.get('/:creatureId/details', async (req, res) => {
    const { creatureId } = req.params;
    // console.log({ creatureId });

    const creature = await creatureService.singleCreature(creatureId).lean();
    // console.log(creature);

    const { user } = req;
    // console.log(user);
    const { owner } = creature;
    // console.log(owner);

    const isOwner = user?._id === owner.toString();
    // console.log(isOwner);

    res.render('post/details', { creature, isOwner });
});

// Edit Creature
router.get('/:creatureId/edit', async (req, res) => {
    const { creatureId } = req.params;
    const creature = await creatureService.singleCreature(creatureId).lean();

    res.render('post/edit', { creature });
});

router.post('/:creatureId/edit', async (req, res) => {
    const { creatureId } = req.params;
    const { name, species, skinColor, eyeColor, image, description } = req.body;
    const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };

    await creatureService.update(creatureId, payload);

    res.redirect(`/posts/${creatureId}/details`);
});

// Delete Creature
router.get('/:creatureId/delete', async (req, res) => {
    const { creatureId } = req.params;
    await creatureService.delete(creatureId);

    res.redirect('/posts/all');
});

module.exports = router;