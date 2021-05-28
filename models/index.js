const User = require('./User');
const Issue = require('./Issue');
const Comment = require('./Comment');

module.exports = { User, Issue, Comment };

//None of these have cascade delete. I don't think it makes sense for anything to be deleted even if the user is deleted.

//User has many Issues
User.hasMany(Issue, {
    foreignKey: 'user_id'
})
//Issues belong to User
Issue.belongsTo(User, {
    foreignKey: 'user_id'
})
//User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
})
//Comments belong to User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})
//Issue have many comments
Issue.hasMany(Comment, {
    foreignKey: 'issue_id'
})
//Comments belong to Issue
Comment.belongsTo(Issue, {
    foreignKey: 'issue_id'
})

module.exports = { User, Issue, Comment};
