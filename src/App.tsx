import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './component/Home';

export default function App(){
  return(
    <>
    <Routes>
      <Route path="/" element ={<Home/>}/>
    </Routes>
    </>
  );
}