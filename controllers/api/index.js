const router = require('express').Router();
const userRoutes = require('./userRoutes');
const issueRoutes = require('./issueRoutes');

//Tells the system to go into the userRoutes.js if /users is in the file path
router.use('/users', userRoutes);
//Tells the system to go into the userRoutes.js if /issues is in the file path
router.use('/issues', issueRoutes);

module.exports = router;
