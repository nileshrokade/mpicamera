import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import StreamVideo  from './components/StreamVideo';
import StreamPlayback from "./components/StreamPlayback";
 
function App() {  
  

  return (
  
    <div className="App">

 <Router>
      <div>
        <nav className='navbar'>
          <ul>            
            <li><Link to="/stream">Stream</Link></li>
            <li><Link to="/ViewStream">View Stream</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<StreamPlayback />} />
          <Route path="/stream" element={<StreamVideo />} />
          <Route path="/ViewStream" element={<StreamPlayback />} />
          </Routes>
      </div>
    </Router>
  
    </div>
  );
}

 //<StreamPlayback></StreamPlayback>

   //<StreamVideo></StreamVideo>
export default App;
