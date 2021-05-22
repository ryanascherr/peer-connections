const router = require('express').Router();
const { Issue } = require('../models/Issue');
const withAuth = require('../utils/auth');
const express    = require('express');
const mysql      = require('mysql');

router.get('/issues/:id', async (req, res) => {
    try {
      const issueData = await Issue.findByPk(req.params.id, {
        include: [
        {
        model: Issue,
        attributes: ['name'],
        },
        ]
    });

      const issue = issueData.map((issues) => issues.get({ plain: true }));
  
      res.render('homepage', {
        issue,
        // Pass the logged in flag to the template
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
//create issue
router.post('/', withAuth, async (req, res) => {
    try {
      const newIssue = await Issue.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newIssue);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //delete issue
  //add non-mvp function for user to only be able to delete issues if they are the user that posted it
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const issueData = await issue.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!issueData) {
        res.status(404).json({ message: 'No issue found with this id!' });
        return;
      }
  
      res.status(200).json(issueData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;