const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const issueRoutes = require('./issueRoutes');

router.use('/', homeRoutes);
router.use('/', issueRoutes);

module.exports = router;
