import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


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
    return     <Card sx={{ maxWidth: 450,margin:"1.5rem" }}>
    <CardMedia
      component="img"
      alt="green iguana"
      height="200"
      image={props.course.imageLink}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.course.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {props.course.description}
      </Typography>
    </CardContent>
    <Link to="/login" style={{ textDecoration: "none" }}>
    <Button size="small" >Update</Button>
            </Link>
      
   
  </Card>
}

export default Courses;
