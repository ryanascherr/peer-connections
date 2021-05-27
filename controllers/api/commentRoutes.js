const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const commentsData = await Comment.findAll().catch((err) => { 
        res.json(err);
      });
        res.json(commentsData);
});

router.post('/', (req, res) => {
    try {
      const newComment = Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        issue_id: req.session.issue_id
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});






module.exports = router;