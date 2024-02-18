import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";


const AddCourse = () => {

  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [imageLink,setImageLink]=useState("");
  const [price,setPrice]=useState("");
  const [isPublished,setispublished]=useState("");


  const styles = {
    main: {
      padding: "6rem",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#eeeeee",
    },
    wrapper: {
      width: "60%",
      display: "flex",
      justifyContent: "center",
      padding: "1rem",
      borderRadius: "20px",
      backgroundColor: "white",
    },
    image: {
      borderRadius: "20px 0 0 20px",
      width: "50%",
      height: "500px",
      background:
        'url("https://img.freepik.com/free-vector/flat-design-online-courses-illustration_52683-37617.jpg")',
      backgroundSize: "contain",
    },
    form: {
      borderRadius: "0 20px 20px 0",
      width: "50%",
      padding: "1.5rem 2rem ",
    },
  };

  return (
    <div style={styles.main}>
      <div style={styles.wrapper}>
        <div style={styles.image}></div>
        <div style={styles.form}>
          <Typography fontSize="15px" fontWeight="700" marginBottom="15px">
            Add Course
          </Typography>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            label="Title"
            variant="outlined"
            style={{ marginBottom: "14px",width:"300px" }}
          />
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            label="Description"
            variant="outlined"
            style={{ marginBottom: "14px",width:"300px" }}
          />
          <TextField
            onChange={(e) => {
              setImageLink(e.target.value);
            }}
            label="Cover Image"
            variant="outlined"
            style={{ marginBottom: "14px",width:"300px" }}
          />
          <TextField
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
            label="Price"
            variant="outlined"
            style={{ marginBottom: "14px",width:"300px" }}
          />

          <TextField
            onChange={(e) => {
              setispublished(e.target.value);
            }}
            value={isPublished}
            label="Published"
            variant="outlined"
            style={{ marginBottom: "14px",width:"300px" }}
          />

          <Button
            style={{
              backgroundColor: "#a435f0",
              float: "right",
              marginRight:"20px",
              "&:hover": {
                backgroundColor: "#5624d0",
              },
            }}
            variant="contained"
            fontWeight="bold"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/admin/courses",
                {
                  title:title,
                  description:description,
                  price:price,
                  imageLink:imageLink,
                  published:"true"
                },{
                  headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                  }
                }
              );
            }}
          >
            Add Course
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
