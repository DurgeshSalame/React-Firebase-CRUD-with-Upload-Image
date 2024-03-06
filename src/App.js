
import "./App.css";
import {  Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import NavBar from "./Components/NavBar";
// import {Senddata, Getdata } from './Senddata';


function App() {
  return (
  
      <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddEditUser />} />
        <Route path='/update/:id' element={<AddEditUser />} />
      </Routes>
      
</>

);
}

export default App;
