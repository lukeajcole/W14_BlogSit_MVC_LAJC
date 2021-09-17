const router = require('express').Router();
const { Blog } = require('../../models');

router.put('/update/:id', async (req, res) => {
 
    try {
      const date_updated = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const {title, content} = req.body;
        const updateBlog = {title, content, date_updated}
        const updBlog = await Blog.update(updateBlog, {where:{id:req.params.id}});
        console.log(req.body)
        res.status(200).redirect('/');
      } catch (err) {
        res.status(500).json(err);
      }
  });

router.post('/new', async (req, res) => {
 
    try {
        const user_id = req.session.user_id;
        const {title, content, date_created} = req.body;
        const newBody = {title, content, date_created, user_id}
        const newBlog = await Blog.create(newBody);
        console.log(newBlog)
        res.status(200).redirect('/');
      } catch (err) {
        res.status(500).json(err);
      }
  });

module.exports = router;