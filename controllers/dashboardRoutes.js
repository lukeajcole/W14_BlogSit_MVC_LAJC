const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {

        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }
      const userDashData = await Blog.findAll(
          {where: {user_id:req.session.user_id},include: [{model: User}]}
      );
      
      const userDash = userDashData.map((blog) => blog.get({ plain: true }));
      console.log(userDash)
      res.render('dashboard', {userDash, 
        logged_in: req.session.logged_in});
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/update/:id', withAuth, async (req, res) => {
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
  
      res.render('updateBlog', {blog, 
        logged_in: req.session.logged_in });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/new', withAuth, async (req, res) => {
    try {
  
      if (!req.session.logged_in) {
        res.redirect('/login');
        return;
      }
  
      res.render('newBlog', {logged_in: req.session.logged_in });

    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;