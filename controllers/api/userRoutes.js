const router = require('express').Router();
const User = require('../../models/');
const withAuth = require('../../utils/auth');

//POST route for signup 
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData.toJSON());
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT request for updating dashboard
router.put('/', withAuth, async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: { id: req.session.user_id }
        });

        if (!userData) {
            res.status(404).json({ message: 'No business found with that Id' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//POST route login 
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne(
            { 
            where: { 
                email: req.body.email 
            },
        });

        if (!userData) {
            res.status(400).json({
                message: 'Incorrect email or password, please try again'
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: 'Incorrect email or password, please try again'
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({
                user: userData,
                message: 'Login successful'
            });
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// POST route for logout
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
            res.render('homepage');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
