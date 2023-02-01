import { Route, Routes } from "react-router-dom";

import Home from "@pages/Home";
import Admin from "@pages/Admin";
import Project from "@pages/Project";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
