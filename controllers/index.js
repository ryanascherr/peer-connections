const router      = require('express').Router();
const homeRoutes  = require('./userRoutes');
const issueRoutes = require('./issueRoutes');

router.use('/', homeRoutes);
router.use('/', issueRoutes);

module.exports = router;
