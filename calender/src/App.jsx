import CalendarContainer from "./components/CalendarContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import AllEvents from "./components/AllEvents";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarContainer />} />
        <Route path="/all-events" element={<AllEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
