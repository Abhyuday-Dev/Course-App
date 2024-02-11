import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const AppBar = () => {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.name) {
            console.log(data.name)
          setUserName(data.name);
          setIsLoading(false);
        }
      });
  }, []);
  if (isLoading) {
    <div></div>;
  }
  if (userName) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          backgroundColor: "#5624d0",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h4" color="white" fontWeight="bold">
            Learnify
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Typography
            color="white"
            backgroundColor="black"
            fontSize="25px"
            width="40px"
            height="40px"
            padding="0rem 0.3rem"
            textAlign="center"
            borderRadius="50%"
            marginRight="15px"
          >
            {userName[0]}
          </Typography>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => {
              window.location = "/";
              localStorage.setItem("token", null);
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          backgroundColor: "#5624d0",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h4" color="white" fontWeight="bold">
            Learnify
          </Typography>
        </div>
        <div>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => {
              window.location = "/signup";
            }}
          >
            Sign up
          </Button>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => {
              window.location = "/login";
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }
};

export default AppBar;
