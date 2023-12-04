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


// Profile View
router.get('/profile', async (req, res) => {
    const { user } = req;
    const myCreatures = await creatureService.getMyCreatures(user?._id).lean();

    res.render('post/profile', { myCreatures });
});

// Details View
router.get('/:creatureId/details', async (req, res) => {
    const { creatureId } = req.params;
    // console.log({ creatureId });

    const creature = await creatureService.getSingleCreature(creatureId).lean();
    // console.log(creature);

    const { user } = req;
    // console.log(user);
    const { owner } = creature;
    // console.log(owner);

    const isOwner = user?._id === owner.toString();
    // console.log(isOwner);

    const hasVoted = creature.votes?.some((v) => v?._id.toString() === user?._id);
    const joinedEmailsOfOwners = creature.votes.map(v => v.email).join(', ');

    res.render('post/details', { creature, isOwner, hasVoted, joinedEmailsOfOwners });
});

// Edit Creature
router.get('/:creatureId/edit', async (req, res) => {
    const { creatureId } = req.params;
    const creature = await creatureService.getSingleCreature(creatureId).lean();

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

// Votes
router.get('/:creatureId/vote', async (req, res) => {
    const { creatureId } = req.params;
    const { _id } = req.user;
    await creatureService.addVotesToCreature(creatureId, _id);

    res.redirect(`/posts/${creatureId}/details`);
});

module.exports = router;