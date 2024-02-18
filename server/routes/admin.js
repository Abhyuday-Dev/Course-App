
const {Admin,Course}=require('../database/db');
const express=require('express');
const jwt=require('jsonwebtoken');
const {authenticateJwt,SECRET}=require('../middleware/auth');


const router=express.Router();

router.get("/me",authenticateJwt,async(req,res)=>{
    const admin=await Admin.findOne({username: req.user.username});
    if(!admin) {
        res.status(403).json({message:"Admin Dosen't exist"});
        return;
    }
    res.json({
        username: admin.username,
        name:admin.name
    })
});

router.post("/signup",async(req,res)=>{
    const {username,password,name}=req.body;
    Admin.findOne({username}).then((admin)=>{
        if(admin){
            res.status(403).json({message:"Admin Already exist"});
        }
        else{
            const obj={name:name,username:username,password:password};
            const newAdmin=new Admin(obj);
            newAdmin.save();

            const token=jwt.sign({username,role:'admin'},SECRET,{expiresIn:'2h'});
            //console.log(token);
            res.json({message:"Admin Created Successfully",token:token});
        }
    })
});

router.post("/login",async(req,res)=>{
    const {username,password}=req.headers;
    const admin=await Admin.findOne({username,password});
    if(admin){
        const token=jwt.sign({username,role:'admin'},SECRET,{expiresIn:'2h'});
        console.log(token);
        res.json({message:"Logged In Successfully",token:token});
    }
    else{
        res.status(403).json({message:"Invalid username or password"});
    }
});

router.post("/courses", authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "Course Created Successfully", courseId: course.id });
  });
  

router.put("/courses/:courseId",authenticateJwt,async(req,res)=>{
    const course=await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
    if(course){
        res.json({message:"Course Updated Successfully"});
    }else{
        res.status(404).json({message:"Course Not Found"});
    }
});

router.get("/courses",authenticateJwt,async(req,res)=>{
    const courses=await Course.find({});
    res.json({courses});
});

router.get("/courses/:courseId",authenticateJwt,async(req,res)=>{
    const courseId=req.headers.courseId;
    const course=await Course.findById(courseId);
    if(course){
        res.json({course})
    }
    else{
        res.status(404).json({message:"Course Not Found"});
    }
});

module.exports=router;
