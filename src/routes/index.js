const passport = require('passport');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Colby MacArthur - CSE341 Project 2');
});

router
    .use('/', require('./swagger'))
    .use('/users', require('./users'))
    .use('/posts', require('./posts'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;