var mongoose = require('mongoose');

var articleDB = mongoose.createConnection('mongodb://article_reader:article_reader@ds063879.mongolab.com:63879/heroku_app29725784');
//db for users and hendelse
var DB = mongoose.createConnection('mongodb://localhost:27017/sol');

var Articles = articleDB.model('articles', {
    _id: String,
    content: String,
    createTime: Date,
    drFrontId: String,
    imgUrl: String,
    link: String,
    type: String,
    updateTime: Date
});

var Users = DB.model('users', {
    username: String,
    password: String,
    role: String
});

var Events = DB.model('events', {
    name: String,
    articles: Array,
    createTime: Date,
    updateTime: Date
});

module.exports.ARTICLES = Articles;
module.exports.USERS = Users;
module.exports.EVENTS = Events;