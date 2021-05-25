const sequelize = require('../config/connection');
const { User, Issue } = require('../models/');

const userData = require('./userData.json');
const issueData = require('./issueData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Issue.bulkCreate(issueData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();