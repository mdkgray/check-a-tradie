const router = require('express').Router();
const { response } = require('express');
const { User } = require('../models');

//get route for homepage 
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

// get for a single post 
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

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        response.redirect('/dashboard');
        return;
    }

    res.render('/login');
});

module.exports = router 
