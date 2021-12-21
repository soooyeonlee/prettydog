import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './component/Home';
import Login from './component/Login';

export default function App(){
  useEffect(() => {
    if(!sessionStorage.getItem('token') && window.location.pathname !== '/login'){
        document.location.href = "/login";
    }
  },[]);
  return(
    <>
    <Routes>
      <Route path="/home" element ={ sessionStorage.getItem('token')? <Home/> : null }/>
      <Route path="/login" element ={<Login/>}/>
    </Routes>
    </>
  );
}