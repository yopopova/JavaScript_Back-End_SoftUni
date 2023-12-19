const router = require('express').Router();
const publicationService = require('../services/publicationService');
const authorService = require('../services/authorService');
const { isAuth } = require('./../middlewares/authMiddleware');
const { extractErrorMsgs } = require('./../utils/errorHandler');

// Visualize GALLERY
router.get('/paintings', async (req, res) => {
    // const publications = []; // To check if there is something in the gallery
    const publications = await publicationService.getAll().lean();

    res.render('paintings/gallery', { publications }); // Here the path comes from the folder
});


// Visualize CREATE
router.get('/create', isAuth, (req, res) => {
    res.render('paintings/create');
});

router.post('/create', async (req, res) => {
    const { title, paintingTechnique, artPicture, certificate } = req.body;
    const payload = { title, paintingTechnique, artPicture, certificate, author: req.user };
    // console.log({ payload });
    
    try {
        await publicationService.create(payload);
        res.redirect('/gallery/paintings');
    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('paintings/create', { errorMessages });
    }
});


// Visualize PROFILE
router.get('/profile', isAuth, async (req, res) => {
    const { user } = req;
    const userId = user?._id;

    const userInfo = await authorService.findUser(userId); // Here take the username and address
    // console.log(userInfo);

    const myPublications = await publicationService.getMyPublications(userId).lean();

    const allPublications = [];
    myPublications.map((publication) => allPublications.push(publication.title));
    allPublications.join(', ');
    const isFull = allPublications.length > 0 ? true : false;

    res.render('paintings/profile', { userInfo, isFull, allPublications });
});


// Visualize DETAILS
router.get('/:publicationId/details', async (req, res) => {
    const { publicationId } = req.params;
    const publication = await publicationService.getSinglePublication(publicationId).lean();
    // console.log(publication);

    const { user } = req; // Current logged in user ID. We can replace this part with 'isAuthenticated'
    // console.log(user);
    const { author } = publication; // Author ID
    // console.log(author);

    const publicationAuthor = await authorService.findAuthor(author); // Find the author for every publication
    // console.log(publicationAuthor);

    const isAuthor = user?._id === author.toString();
    // console.log(isAuthor);


    const hasShared = publication.usersSharing?.some((share) => share?._id.toString() === user?._id);

    res.render('paintings/details', { publication, publicationAuthor, user, isAuthor, hasShared });
});


// Visualize EDIT
router.get('/:publicationId/edit', isAuth, async (req, res) => {
    const { publicationId } = req.params;
    const publication = await publicationService.getSinglePublication(publicationId).lean();

    res.render('paintings/edit', { publication });
});

router.post('/:publicationId/edit', async (req, res) => {
    const { publicationId } = req.params;
    const { title, paintingTechnique, artPicture, certificate } = req.body;
    const payload = { title, paintingTechnique, artPicture, certificate, author: req.user };

    await publicationService.update(publicationId, payload);
    res.redirect(`/gallery/${publicationId}/details`);
});


// Visualize DELETE
router.get('/:publicationId/delete', async (req, res) => {
    const { publicationId } = req.params;
    await publicationService.delete(publicationId);

    res.redirect('gallery/paintings');
});


// Visualize SHARES
router.get('/:publicationId/share', async (req, res) => {
    const { publicationId } = req.params;
    // console.log(publicationId);

    const { _id } = req.user;
    // console.log(_id);
    await publicationService.addSharesToPublication(publicationId, _id);

    res.redirect('/');
});


module.exports = router;