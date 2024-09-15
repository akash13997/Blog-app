import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      sessionStorage.removeItem("login")
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleNavLogin = () =>{
    navigate("/login")
  }
  return (
    <>
    <div className="row d-flex justify-content-center mt-4">
    <div className="col-lg-4 col-md-4 col-10 border p-4">
      <div className="p-4 box mt-3 text-center">
        Hello <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
      { user ? <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>: <Button variant="primary" onClick={handleNavLogin}>
          LogIn
        </Button>}
      </div>
      </div>
      </div>
    </>
  );
};

export default Home;