import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";


import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Admin_register from "./components/common/Admin_register";
import Admin_login from "./components/common/Admin_login";
import AdminDashboard from "./components/users/AdminDashboard";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import Navbar2 from "./components/templates/Navbar2";
import Sidebar from "./components/templates/Sidebar"
import StudyDashboard from "./components/users/StudyDashboard";
import AddTest from "./components/users/AddTest";
import AddStudy from "./components/users/AddStudy";
import AddPatient from "./components/users/AddPatient";
// import Test from "./components/users/Tests";
import PatientDashboard from "./components/users/PatientDashboard";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
const Layout2 = () => {
  return (
    <div>
      <Sidebar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
const Layout3 = () => {
  return (
    <div>
      <Navbar2 />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="users" element={<UsersList />} /> */}
          <Route path="register" element={<Register />} />
          <Route path="adminregister" element={<Admin_register />} />
          <Route path="adminlogin" element={<Admin_login />} />
        
          <Route path="login" element={<Login />} />
          {/* <Route path="tests" element={<Test />}/> */}
        </Route>
        <Route path="/" element={<Layout2 />}>
          {/* <Route path="tests" element={<Test />}/> */}
          <Route path="studyDashboard" element={<StudyDashboard />}/>
          <Route path="addTest" element={<AddTest />}/>
          <Route path="addPatient" element={<AddPatient />}/>


        </Route>
        <Route path="/" element={<Layout3 />}>
        <Route path="adminDashboard" element={<AdminDashboard />}/>
        <Route path="addStudy" element={<AddStudy />}/>
        <Route path="patientdashboard" element={<PatientDashboard />}/>

          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
