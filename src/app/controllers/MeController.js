const { mutipleMongooseToObject } = require("../../until/mongoose");
const Course = require("../modal/Course");

class MeController {
  // [GET] me/stored/courses
  storedCourses(req, res, next) {

    let courseQuery=Course.find({})

      if(req.query.hasOwnProperty('_sort')){
        courseQuery=courseQuery.sort({
          [req.query.column]:req.query.type,
        })
      }
    
    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([course, deletedCount]) =>
        res.render("me/stored-courses", {
          deletedCount,
          courses: mutipleMongooseToObject(course),
        })
      )
      .catch(next);
  }

  // [GET] me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((course) => {
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(course),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
