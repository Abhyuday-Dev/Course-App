import { Button,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Courses() {
  const [courses, setCourses] = useState([]);

  const init = async () => {
    const response = await axios.get(`${BASE_URL}/admin/courses/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCourses(response.data.courses);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width:"400px",maxWidth: 400, margin: "1.5rem" }}>
      {" "}
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={course.imageLink}
      />{" "}
      <CardContent>
        {" "}
        <Typography gutterBottom variant="h5" component="div">
          {" "}
          {course.title}{" "}
        </Typography>{" "}
        <Typography variant="body2" color="text.secondary">
          {" "}
          {course.description}{" "}
        </Typography>{" "}
      </CardContent>{" "}
      <div style={{ float:"right", margin: "20px" }}>
        {" "}
        <Button
          variant="contained"
          size="small"
          style={{backgroundColor:"#5624d0",fontWeight:"bold"}}
          onClick={() => {
            navigate("/course/" + course._id);
          }}
        >
          Update
        </Button>{" "}
      </div>{" "}
    </Card>
  );
}

export default Courses;
