import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

// Screens
import Landing from "./screens/Landing.jsx";
import CreateQpage from "./components/Sections/CreateQpage.jsx";
import SolveQpage from "./components/Sections/SolveQpage.jsx";
import Classroom from "./components/Sections/Classroom.jsx";
import TopNavbar from "./components/Nav/TopNavbar.jsx";
import Footer from "./components/Sections/Footer.jsx";
import ProClassroom from "./components/Sections/ProClassroom.jsx";
import Community from "./components/Sections/Community.jsx";
import DiaryPage from "./components/Sections/DiaryPage.jsx";
import FreeCommu from './components/Sections/FreeCommu.jsx';
import Write from './components/Sections/Write.jsx'; // Write를 올바르게 import
import PostDetail from './components/Sections/PostDetail.jsx'; // PostDetail을 올바르게 import
import Feedback from "./components/Sections/Feedback.jsx";
import Feedbacklook from "./components/Sections/Feedbacklook.jsx";
import Chatting from "./components/Sections/Chatting.jsx";
import StudyDiary from "./components/Sections/StudyDiary.jsx";
import ClassDiary from "./components/Sections/ClassDiary.jsx";
import StudyDiarylook from "./components/Sections/StudyDiarylook.jsx";

// Member
import Login from "./components/Member/Login.jsx";
import Membership from "./components/Member/Membership.jsx";
import TeacherSingout from "./components/Member/TeacherSingout.jsx";
import StudentSingout from "./components/Member/StudentSingout.jsx";

import { AuthProvider } from "./components/Member/AuthContext.jsx";

export default function App() {

  return (
    <Router>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>

      <AuthProvider>
        <TopNavbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/community" element={<Community />} />
          <Route path="/create_question/:course_name" element={<CreateQpage />} />
          <Route path="/solve_question/:course_imformation" element={<SolveQpage />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/teacherSingout" element={<TeacherSingout />} />
          <Route path="/studentSingout" element={<StudentSingout />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/proClassroom" element={<ProClassroom />} />
          <Route path="/freeCommu" element={<FreeCommu />} />
          <Route path="/write" element={<Write />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/feedback/:course_imformation" element={<Feedback />} />
          <Route path="/feedbacklook/:course_imformation" element={<Feedbacklook />} />
          <Route path="/chatting" element={<Chatting />} />
          <Route path="/studyDiary" element={<StudyDiary/>} />
          <Route path="/classDiary" element={<ClassDiary/>} />
          <Route path="/studyDiarylook" element={<StudyDiarylook/>} />
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>
  );
}