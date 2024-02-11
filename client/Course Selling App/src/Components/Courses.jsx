import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const  Courses = () => {
  const [courses, setCourse] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",

      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCourse(data.courses);
      });
  }, []);
  return <div style={{background:"white",display:"flex",flex:"1",flexWrap:"wrap"}}>
    {courses.map(course=>{
        return <Course course={course} />;
    })}
  </div>;
};

export function Course(props){
    return <Card style={{border:"2px solid black",width:300,margin:10,minHeight:200}}>
    <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
    <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
    <img src={props.course.imgLink} alt="Course Cover Image" style={{width:300}} />
    </Card>
}

export default Courses;
