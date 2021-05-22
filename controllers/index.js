const router      = require('express').Router();
const homeRoutes  = require('./homeRoutes');
const issueRoutes = require('./issueRoutes');

router.use('/users', homeRoutes);
router.use('/issues', issueRoutes);

module.exports = router;
