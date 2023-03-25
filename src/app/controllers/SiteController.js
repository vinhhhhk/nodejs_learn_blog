const { mutipleMongooseToObject } = require("../../until/mongoose");
const Course = require("../modal/Course");

class SiteController {
  // [GET] '/news'
  index(req, res,next) {
    
    Course.find({})
            .then(courses => {
                res.render('home',{
                courses:mutipleMongooseToObject(courses),
            })})
            .catch(err => next(err))
  }
  // [GET] :/rearch
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();