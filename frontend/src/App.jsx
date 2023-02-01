import { Route, Routes } from "react-router-dom";

import Home from "@pages/Home";
import Details from "@pages/Admin";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
