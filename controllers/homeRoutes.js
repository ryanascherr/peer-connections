const router = require('express').Router();
const { Issue, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Brings user to homepage (homepage.handlebars)
router.get('/', async (req, res) => {
    //We need all of the Issues from the database so that they can be displayed on the front page
    const issueData = await Issue.findAll({
      order: [
        ['date_created', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    })
      const issues = issueData.map((dish) => dish.get({ plain: true }));
      res.render('homepage', { issues, logged_in: req.session.logged_in });
});

//Brings user to issue page with the corresponding id number
router.get('/issue/:id', async (req, res) => {
    try {
      const issueData = await Issue.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comment,
            attributes: ['content', 'user_id', 'date_created']
          }
        ]
      });
      if (!issueData) {
        res.status(404).json({ message: 'No issue found with this id!' });
        return;
      }
      //Renders the issue page with a variable called 'issues' which contains all of that issue's information
      const issues = issueData.get({ plain: true });
      // console.table(issues);
      res.render(`issues`, {issues, logged_in: req.session.logged_in});
    } catch (err) {
    }
});

//Brings user to the login page (login.handlebars)
router.get('/login', (req, res) => {
    //If the user is already logged in, redirect them to the homepage (homepage.handlebars)
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

//Brings users to the create post page (create.handlebars)
router.get('/create', async (req, res) => {
    //If the user is not logged in, redirect the to the homepage (homepage.handlebars)
    if (!req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('create', { logged_in: req.session.logged_in });
});

//Unsure about profile page right now

// router.get('/profile', withAuth, async (req, res) => {
//     try {
//       // Find the logged in user based on the session ID
//       const userData = await User.findByPk(req.session.user_id, {
//         attributes: { exclude: ['password'] },
//         include: [{ model: Issue }],
//       });
  
//       const user = userData.get({ plain: true });
  
//       res.render('profile', {
//         ...user,
//         logged_in: true
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
// });

module.exports = router;