const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(
        'mongodb+srv://admin:NnyK5tYfBKFjfmo1@cluster0.s2bd2he.mongodb.net/?retryWrites=true&w=majority',
       { useNewUrlParser : true,
        useUnifiedTopology : true }
      )
      .then(()=>console.log('connected'))
      .catch(e=>console.log(e));
      
}
module.exports= {connect};