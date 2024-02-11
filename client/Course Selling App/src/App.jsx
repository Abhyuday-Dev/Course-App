
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppBar from './Components/AppBar';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import AddCourse from './Components/AddCourse';
import Courses from './Components/Courses';
import Course from './Components/Course';
import Home from './Pages/Home';
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <div className="App" >
      <RecoilRoot>
      <AppBar />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/addcourse' element={<AddCourse />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/:courseId' element={<Course />} />
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
