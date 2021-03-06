const router = require('express').Router();
const { Comment, User, Issue } = require('../../models');
const withAuth = require('../../utils/auth');

// get route to find all comments
router.get('/', async (req, res) => {
    const commentsData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],

    }).catch((err) => { 
        res.json(err);
      });
        res.json(commentsData);
});

//post route to create comments, requires authentication
router.post('/', withAuth, (req, res) => {
    try {
      const newComment = Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        user_name: req.session.user_name,
        issue_id: req.body.btnID,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

//delete route to remove comments, requires authentication
router.delete('/:id', async (req, res) => {
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