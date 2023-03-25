const Course = require("../modal/Course");
const {mongooseToObject, mutipleMongooseToObject} =require('../../until/mongoose')

class CourseController {
  
  show(req, res,next) {
    Course.findOne({slug: req.params.slug})
      .then(course =>{
          res.render('courses/show',{course : mongooseToObject(course)})
        }
      )
      .catch(next)
  }

  // GET courses
  create(req, res,next) {
    res.render('courses/create')
  }

  // POST  courses
  store(req, res,next) {
    req.body.image='https://files.fullstack.edu.vn/f8-prod/courses/6.png'
    const course= new Course(req.body)
    course.save()
          .then(() => { res.redirect('/me/stored/courses')})
          .catch(error =>{})
  }
  // GET Edit courses
  edit(req, res,next) {
    Course.findById(req.params.id, )
      .then(course => res.render('courses/edit',
      {courses : mongooseToObject(course)}
      ))
      .catch(next)
    
  }
  // PUT update courses/:id
  update(req, res,next) {
    Course.updateOne({_id:req.params.id}, req.body)
      .then(() =>{res.redirect('/me/stored/courses')})
      .catch(next)
  }

  // Delete courses/:id
  destroy(req, res, next) {
    Course.delete({_id:req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)
  }

  // DELETE  courses/:id/force
  forceDestroy(req, res,next) {
    Course.deleteOne({_id:req.params.id})
      .then(() =>{res.redirect('back')})
      .catch(next)
  }

  // PATCH restore courses/:id/restore
  restore(req, res,next) {
    Course.restore({_id:req.params.id})
      .then(() =>{res.redirect('back')})
      .catch(next)
  } 

  // POST /course/handle-form-actions
  
  handleFormActions(req, res,next) {
    switch(req.body.action) {
      case 'delete': 
      Course.delete({_id : {$in :req.body.courseIds}})
        .then(() => res.redirect('back'))
        .catch(next)
        break;
      default :
        res.json({message :'action is invalid'})  
    }
  } 
}


module.exports = new CourseController();
