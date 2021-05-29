const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get route to find all comments
router.get('/', async (req, res) => {
    const commentsData = await Comment.findAll().catch((err) => { 
        res.json(err);
      });
        res.json(commentsData);
});

//post route to create comments, requires authentication
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

//delete route to remove comments, requires authentication
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;