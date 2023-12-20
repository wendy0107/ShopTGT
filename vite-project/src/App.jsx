import React from "react"
import { Navbar } from "./components/navbar";
// import { Login } from "./pages/login";
import { SignUp } from "./pages/signup/signup";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
return (
  <div className="App">
    <Router>
      {/* <Navbar  /> */}
      <Routes>
        <Route path="/" element={<SignUp />}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App;