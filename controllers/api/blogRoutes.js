const router = require('express').Router();
const { Blog } = require('../../models');

router.put('/update/:id', async (req, res) => {
 
    try {
        req.body.date_updated = new Date().toISOString().slice(0, 19).replace('T', ' ');
    //   const updBlog = await Blog.update(req.body, {where:{id:req.params.id}});
        console.log(req.body)
        res.status(200).redirect('/');
      } catch (err) {
        res.status(500).json(err);
      }
  });

module.exports = router;