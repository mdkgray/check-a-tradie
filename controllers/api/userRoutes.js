const router = require('express').Router();
const User = require('../../models');
const withAuth = require('../../utils/auth');

//get route for homepage 
router.get('/', withAuth, async (req, res) => {
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

router.get('user/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });

        const users = userData.get({ plain: true });

        response.render('dashboard', {users});
    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;
