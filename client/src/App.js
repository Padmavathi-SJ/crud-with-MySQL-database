import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; 
import CreateStudent from './Components/Create'; 
import UpdateStudent from './Components/Update'; // Import the Update component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/create" element={<CreateStudent />} /> {/* Create student page */}
          <Route path="/update/:id" element={<UpdateStudent />} /> {/* Update student page */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
