const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedBlogs = require('./blogData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedBlogs();

  process.exit(0);
};

seedAll();
