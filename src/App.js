// import logo from './logo.svg';
// import './App.css';
// import Movie from './movie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Moviedetail from './moviedetail';
import React from 'react';
import Totalapp from './totalapp';
import { MovieDisp } from './movie';
import Movielist from './movielist';
// import { useFetch } from './fetchdata';
// import Movielist from './movielist';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Totalapp />} />
        <Route path="/:keyword" element={<Totalapp />} />
        <Route path="/:keyword/:id" element={<Moviedetail />} />
      </Routes>
    </Router>
  );
}

export default App;
