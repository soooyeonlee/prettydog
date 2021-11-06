import React from 'react';
import './App.css';
import { Route } from 'react-router';
import Home from './component/Home';

export default function App(){
  return(
    <>
    <Route path="/" component={Home}/>
    </>
  );
}