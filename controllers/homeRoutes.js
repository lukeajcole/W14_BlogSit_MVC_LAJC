const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in Blogs from viewing the homepage
// WHEN I visit the site for the first time
// THEN I am presented with the homepage, which includes existing blog posts if any have been posted; 
          //navigation links for the homepage and the dashboard; and the option to log in
// WHEN I am signed in to the site
// THEN I see navigation links for the homepage, the dashboard, and the option to log out
// WHEN I click on the homepage option
// THEN I am taken to the homepage
// WHEN I click on any other links in the navigation
// THEN I am prompted to either sign up or sign in
// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site
// WHEN I am idle on the site for more than a set time
// THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
router.get('/',async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    const blogs = blogData.map((project) => project.get({ plain: true }));
    console.log(blogs)
    res.render('homepage', {blogs, 
      logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    const blogData = await Blog.findByPk(req.params.id, {
      include: {
          model: User,
          attributes: ['name'],
      }
    });

    const blog = blogData.get({ plain: true });
    console.log("BLOG: " + blog);

    res.render('blog', {blog, 
      logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup/', (req, res) => {
  res.render('signup');
});

module.exports = router;
