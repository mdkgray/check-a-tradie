const router = require('express').Router();
const User = require('../models');
const withAuth = require('../utils/auth');

//GET route for homepage 
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        const users = userData.map((user) => user.get({ plain: true }));

        res.render('homepage', {users});
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET for a single post if not logged in
router.get('/user/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);

        const users = userData.get({ plain: true });

        res.render('profile', {
            ...users
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for business that is already logged in 
router.get('/dashboard', withAuth, async(req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });

        const users = userData.get({ plain: true });

        res.render('dashboard', {
            ...users,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get route for login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router 
