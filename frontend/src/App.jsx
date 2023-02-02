import { Route, Routes } from "react-router-dom";

import Home from "@pages/Home";
import Admin from "@pages/Admin";
import Project from "@pages/Project";
import ProjectAdmin from "@pages/ProjectAdmin";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="admin/project/:id" element={<ProjectAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
