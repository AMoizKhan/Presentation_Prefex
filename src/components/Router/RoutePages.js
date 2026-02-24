import React from 'react';
import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import App from '../../App';
import Login from '../Main/Login';
import Signup from '../Main/Signup';
import VideoDetection from '../Main/VideoDetection';
import Home from '../Main/Home';
import ProgressReport from '../Main/ProgressReport';
import Services from '../Services';
import Transcript from '../Main/Transcript';
import Reviews from '../Main/Reviews';
import FAQ from '../Main/FAQ';
import RandomWords from '../Main/RandomWords';
import Profile from '../Main/profile';


const RoutePage = () => {
  return (
    <BrowserRouter>
    
    <Routes >
     
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/videodetection" element={<VideoDetection />} />
      <Route path="/progressreport" element={<ProgressReport />} />
      <Route path="/transcript" element={<Transcript />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/reviews/FAQ" element={<FAQ />} />
      <Route path="/reviews/RandomWords" element={<RandomWords />} />
      
    </Routes>
    </BrowserRouter>
  );
};

export default RoutePage;