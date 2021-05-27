const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//Tells the system to use homeRoutes.js if only a / is in the file path
router.use('/', homeRoutes);
//Tells the system to go into the apiRoutes folder if /api is in the file path
router.use('/api', apiRoutes);

module.exports = router;

