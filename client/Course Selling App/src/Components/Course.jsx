import { Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const Course = () => {
  let { courseId } = useParams();

  const setCourses = useSetRecoilState(coursesState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && data.courses) {
          setCourses(data.courses);
          setLoading(false); // Set loading to false when courses are available
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);

  // let course = null;
  // if (!loading) {
  //   for (let i = 0; i < courses.length; i++) {
  //     if (courses[i].id == courseId) {
  //       course = courses[i];
  //       console.log("Course", course);
  //     }
  //   }
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {courseId}
     
      <CourseCard courseId={courseId} />
      <UpdateCard courseId={courseId} />
    </div>
  );
};

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");

  // props.setCourse()
  const [courses, setCourses] = useRecoilState(coursesState);
  return (
    <div
      style={{
        backgroundColor: "#eeeeee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Update the course</Typography>
      <Card variant="outlined" style={{ width: "500px", padding: "1rem" }}>
        <div
          className="form"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.8rem",
          }}
        >
          <TextField
            fullWidth={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth={true}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth={true}
            onChange={(e) => {
              setImageLink(e.target.value);
            }}
            id="outlined-basic"
            label="Course Cover Image"
            variant="outlined"
            style={{ marginBottom: "10px" }}
          />
          <Button
            size={"large"}
            variant="contained"
            onClick={() => {
            

              fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                method: "PUT",
                body: JSON.stringify({
                  title: title,
                  description: description,
                  price: "455",
                  imgLink: imageLink,
                  published: "true",
                }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  alert("Course updated successfully");
                  let updatedCourses = [];
                  for (let i = 0; i < props.courses.length; i++) {
                    if (courses[i].id === props.courseId) {
                      updatedCourses.push({
                        id: props.courseId,
                        title: title,
                        description: description,
                        price: "455",
                        imgLink: imageLink,
                        published: "true",
                      });
                    } else {
                      updatedCourses.push(courses[i]);
                    }
                  }
                  setCourses(updatedCourses);
                })
                .catch((error) => {
                  console.error("Error updating course:", error);
                });
            }}
          >
            Update Course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const courses = useRecoilValue(coursesState);

  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == props.courseId) {
      course = courses[i];
    }
  }

  if (!course) {
    return <div>No course data available.</div>; // or any other appropriate message or UI
  }
  return (
    <Card
      style={{
        border: "2px solid black",
        width: 300,
        margin: 10,
        minHeight: 200,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <img src={course.imgLink} alt="Course Cover" style={{ width: 300 }} />
    </Card>
  );
}

export default Course;

const coursesState = atom({
  key: "coursesState",
  default: "",
});
