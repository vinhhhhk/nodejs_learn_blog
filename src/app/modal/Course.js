const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
var mongooseDelete = require("mongoose-delete");
const AutoIncrement =require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    _id:{ type:Number },
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    videoId: { type: String, maxLength: 255 },
    level: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
  },
  { _id:false,
    timestamps: true }
);

Course.plugin(AutoIncrement)
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
   
    overrideMethods: "all",
},{ deletedAt : true ,});

module.exports = mongoose.model("Course", Course);
