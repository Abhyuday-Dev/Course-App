const mongoose = require('mongoose');

//Schemas

//User Schema

const UserSchema=new mongoose.Schema({
    username: {type:String},
    password: String,
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Course'}]
});

//Admin Schema

const AdminSchema=new mongoose.Schema({
    name:{type:String},
    username: {type:String},
    password: String
});

//Course Schema

const CourseSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    published:Boolean,
});

const User=mongoose.model('User',UserSchema);
const Admin=mongoose.model('Admin',AdminSchema);
const Course=mongoose.model('Course',CourseSchema);

module.exports = {
    User,Admin,Course
}