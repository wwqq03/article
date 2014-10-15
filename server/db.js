var mongoose = require('mongoose');

mongoose.connect("mongodb://article_reader:article_reader@ds063879.mongolab.com:63879/heroku_app29725784");

var Articles = mongoose.model('articles', {
    _id: String,
    content: String,
    createTime: Date,
    drFrontId: String,
    imgUrl: String,
    link: String,
    type: String,
    updateTime: Date
});

module.exports.ARTICLES = Articles;