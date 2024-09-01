import React from 'react'
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Rating,
} from '@mui/material'
// import { School, People } from '@mui/icons-material'
import { IoMdPeople } from "react-icons/io";

const dummyCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    image: "https://www.creative-tim.com/blog/content/images/size/w960/2022/01/which-development-job-is-right-for-you.jpg",
    rating: 4.8,
    reviews: 320
  },
  {
    id: 2,
    title: "Data Science:Basic to Advanced",
    description: "Explore the world of data analysis, machine learning, and statistical modeling.",
    image: "https://ioe.engin.umich.edu/wp-content/uploads/sites/7/2021/06/RESIZED_IOE-Masters_-Data-Analytics-and-Applied-Statistics.jpg",
    rating: 4.6,
    reviews: 280
  },
  {
    id: 3,
    title: "Mobile App Development with React Native",
    description: "Create cross-platform mobile apps using React Native and JavaScript.",
    image: "https://cdn.elearningindustry.com/wp-content/uploads/2022/12/shutterstock_1950547489.jpg",
    rating: 4.7,
    reviews: 195
  }
];

export default function Home() {
  return (
    <div>
      <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Unlock Your Potential with Learnify
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary" paragraph>
            Discover a world of knowledge with our expert-led online courses.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              mt: 2, 
              bgcolor: '#5624d0', 
              '&:hover': { bgcolor: 'darkpurple' } 
            }}
          >
            Explore Courses
          </Button>
        </Box>

      
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 8, mb: 4 }}>
          Featured Courses
        </Typography>
        <Grid container spacing={4}>
          {dummyCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.image}
                  alt={course.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Rating value={course.rating} readOnly precision={0.1} />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      {course.rating} ({course.reviews} reviews)
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ 
                      mt: 2, 
                      color: '#5624d0', 
                      borderColor: '#5624d0',
                      '&:hover': { 
                        bgcolor: '#5624d0', 
                        color: 'white' 
                      } 
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Testimonials */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 8, mb: 4 }}>
          What Our Students Say
        </Typography>
        <Grid container spacing={4}>
          {[1, 2, 3].map((testimonial) => (
            <Grid item key={testimonial} xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#5624d0' }}>{`S${testimonial}`}</Avatar>
                    <Typography variant="subtitle1">Student {testimonial}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    "The courses on CourseHub have been instrumental in advancing my career. The instructors are top-notch and the content is always up-to-date."
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Rating value={5} readOnly />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Start Learning?
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" paragraph>
            Join thousands of students and start your learning journey today.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            startIcon={<IoMdPeople />}
            sx={{ 
              bgcolor: '#5624d0', 
              '&:hover': { bgcolor: 'darkpurple' } 
            }}
            onClick={() => {
              window.location = "/signup";
            }}
          >
            Sign Up Now
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Learnify. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  )
}