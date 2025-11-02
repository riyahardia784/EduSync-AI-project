import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Student from "./pages/Student";
// import Professor from "./pages/Professor"; // optional if you’ll add later

function App() {
  return (
    <Routes>
      
        
        <Route path="/" element={<Student />} />
        {/* <Route path="/professor" element={<Professor />} /> */}
      </Routes>
  );
}

export default App;
