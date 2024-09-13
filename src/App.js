import { Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import MyNavbar from "./components/Navbar";
import Blog from "./components/Blog";

function App() {
  return (
    <>
      <MyNavbar />

      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </>
  );
}

export default App;