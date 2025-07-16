import React from 'react';
import './Disk.css';

import { Link } from 'react-router-dom';

function Disk() {


  
  return (
    <div>
      
     <div className="front-container">
      <div className="overlay">
        <h1 className="company-name">🚀 Shivayom Infotech</h1>
        <h2 className="assessment-title">Fullstack Developer Assessment</h2>
        <p className="description">
          Welcome to our hiring process! This assessment contains 20 MCQs to test your skills in frontend and backend development.
          Please read the instructions carefully and click the button below to begin.
        </p>
        <Link to="/Form"><button className="start-btn">
          Start Assessment
        </button></Link>
      </div>
    </div>

    </div>
  )
}

export default Disk
