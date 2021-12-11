import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './component/Home';
import Login from './component/Login';

export default function App(){
  return(
    <>
    <Routes>
      <Route path="/" element ={<Home/>}/>
      <Route path="/login" element ={<Login/>}/>
    </Routes>
    </>
  );
}