import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Student from "./pages/Student";
import StudentCreate from "./pages/StudentCreate";
import StudentEdit from "./pages/StudentEdit";





function App() {
  return (
    <div className="container-fluid">
     <Router>
        <Navbar/>
       <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/about" exact element={<About/>} />
          <Route path="/contact" exact element={<Contact/>} />
          <Route path="/student" exact element={<Student/>} />
          <Route path="/student/create" exact element={<StudentCreate/>} />
          <Route path="/student/:id/edit" exact element={<StudentEdit/>} />

       </Routes>
         <Footer/>
     </Router>

    </div>
  );
}

export default App;
