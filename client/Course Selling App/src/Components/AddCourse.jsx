import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const AddCourse = () => {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [imageLink,setImageLink]=useState("");
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Add a new Course</Typography>
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
            onChange={(e)=>{
                setTitle(e.target.value);
            }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth={true}
            onChange={(e)=>{
                setDescription(e.target.value);
            }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth={true}
            onChange={(e)=>{
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
            onClick={()=>{
                fetch("http://localhost:3000/admin/courses",{
                    method:"POST",
                    body:JSON.stringify({
                        title:title,
                        description:description,
                        price:"455",
                        imgLink:imageLink,
                        published:"true",
                    }),
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": "Bearer "+localStorage.getItem("token")
                    }
                })
            }}>
         Add Course
        </Button>
        </div>
        
      </Card>
    </div>
  )
}

export default AddCourse