const router = require('express').Router();
const {Comment} = require('../../models');

router.put('/update/:id', async (req, res) => {
 
    try {
        const {comment, comment_date_updated, blog_id} = req.body;
        const updateBlog = {comment, comment_date_updated}
        await Blog.update(updateBlog, {where:{id:req.params.id}});
        res.status(200).end();
      } catch (err) {
        res.status(500).json(err);
      }
  });

router.post('/new', async (req, res) => {
 
    try {
        const user_id = req.session.user_id;
        const {comment, comment_date_created, blog_id} = req.body;
        const newComment = {comment, comment_date_created, blog_id, user_id}
        
        await Comment.create(newComment);
        res.status(200).end();
      } catch (err) {
        res.status(500).json(err);
      }
  });

module.exports = router;