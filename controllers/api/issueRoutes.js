const router = require('express').Router();
const { Issue } = require('../../models');
const withAuth = require('../../utils/auth');


//get route to find all issues
router.get('/', async (req, res) => {
  const issuesData = await Issue.findAll().catch((err) => { 
      res.json(err);
    });
      res.json(issuesData);
});

//get route to search for issues, based on ID
router.get('/:id', async (req, res) => {
  const issueData = await Issue.findByPk(req.params.id, {
  });
  if (!issueData) {
    res.status(404).json({ message: 'No issue found with this id!' });
    return;
  }
      res.json(issueData);
});


//post route to create new issues, this is for logged in users only
router.post('/', withAuth, (req, res) => {
  try {
    const newIssue = Issue.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newIssue);
  } catch (err) {
    res.status(400).json(err);
  }
});


//delete route, to destroy issues, requires authentication
router.delete('/:id', async (req, res) => {
  try {
    const deletedIssue = await Issue.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
});
    if (!deletedIssue) {
      res.status(404).json({ message: 'No issue found with this id!' });
      return;
    }

    res.status(200).json(deletedIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;