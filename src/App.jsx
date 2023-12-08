import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AllUniversities from "./components/AllUniversities";
import UniversitySearch from "./components/SearchUniversity";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UniversitySearch />} />
        <Route path="/all-universities" element={<AllUniversities />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
