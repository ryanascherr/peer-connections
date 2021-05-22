const router   = require('express').Router();
const { User, Issue } = require('../models/User');
const express    = require('express');
const mysql      = require('mysql');
const withAuth = require('../utils/auth');

router.get('/user/:id',  async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
      {
      model: User,
      attributes: ['name'],
      },
      ]
  });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create New User
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});
//Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/', (req, res) => {
  // try {
  //   // Get all users, sorted by name
  //   const userData = await User.findAll({
  //     attributes: { exclude: ['password'] },
  //     order: [['name', 'ASC']],
  //   });

  //   // Serialize user data so templates can read it
  //   const users = userData.map((project) => project.get({ plain: true }));

  //   // Pass serialized data into Handlebars.js template
  //   res.render('/', { users });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  res.render('homepage');
});

router.get('/profile', (req, res) => {
  res.render('profile');
})

router.get('/login', (req, res) => {
  res.render('login');
})


module.exports = router;