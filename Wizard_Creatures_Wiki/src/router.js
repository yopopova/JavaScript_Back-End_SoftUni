const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const allPostsController = require('./controllers/postController');

router.use(homeController);
router.use('/users', userController);
router.use('/posts', allPostsController);

router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;