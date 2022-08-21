const router = require('express').Router();
const User = require('../models');
const withAuth = require('../utils/auth');

//GET route for homepage 
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [
                {
                    model: User, 
                },
            ],
        });
        const users = userData.map((user) => user.get({ plain: true }));

        res.render('homepage', {users});
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET for a single post if not logged in
router.get('/user/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                },
            ],
        });

        const users = userData.get({ plain: true });

        res.render('profile', {
            ...users
        });
    } catch (err) {
        response.status(500).json(err);
    }
});

// GET route for business that is already logged in 
router.get('/dashboard', withAuth, async(req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: User }],
        });

        const users = userData.get({ plain: true });

        res.render('dashboard', {
            ...users,
            logged_in: true,
        });
    } catch (err) {
        response.status(500).json(err);
    }
});

// Get route for login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        response.redirect('/dashboard');
        return;
    }

    res.render('/login');
});

module.exports = router 
