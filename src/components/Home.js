import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Link } from "react-router-dom";

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
  return (
    <>
    <div className="row d-flex justify-content-center mt-4">
    <div className="col-4 border p-4">
      <div className="p-4 box mt-3 text-center">
        Hello <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
      { user ? <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>: <Link to="/login"><Button variant="primary">
          LogIn
        </Button></Link>}
      </div>
      </div>
      </div>
    </>
  );
};

export default Home;