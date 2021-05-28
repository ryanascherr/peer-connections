const router = require('express').Router();
const { Issue } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  const issuesData = await Issue.findAll().catch((err) => { 
      res.json(err);
    });
      res.json(issuesData);
});

router.get('/:id', async (req, res) => {
  const issueData = await Issue.findByPk(req.params.id, {
  });
  if (!issueData) {
    res.status(404).json({ message: 'No issue found with this id!' });
    return;
  }
      res.json(issueData);
});

router.post('/', (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
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

// router.post('/', withAuth, async (req, res) => {
//     try {
//       const newIssue = await Issue.create({
//         ...req.body,
//         user_id: req.session.user_id,
//       });
  
//       res.status(200).json(newIssue);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

//   //delete issue
//   //add non-mvp function for user to only be able to delete issues if they are the user that posted it
//   router.delete('/:id', withAuth, async (req, res) => {
//     try {
//       const issueData = await issue.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!issueData) {
//         res.status(404).json({ message: 'No issue found with this id!' });
//         return;
//       }
  
//       res.status(200).json(issueData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;