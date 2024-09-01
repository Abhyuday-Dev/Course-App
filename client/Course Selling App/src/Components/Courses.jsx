import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Container, 
  CircularProgress 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BASE_URL } from "../config.js";

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.15s ease-in-out',
  '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' },
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

function Course({ course }) {
  const navigate = useNavigate();

  return (
    <StyledCard>
      <StyledCardMedia
        image={course.imageLink}
        title={course.title}
      />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </StyledCardContent>
      <CardContent>
        <Button
          variant="contained"
          size="small"
          fullWidth
          style={{backgroundColor: "#5624d0"}}
          onClick={() => navigate(`/course/${course._id}`)}
        >
          Update
        </Button>
      </CardContent>
    </StyledCard>
  );
}

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/courses/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course._id} xs={12} sm={6} md={4}>
            <Course course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}