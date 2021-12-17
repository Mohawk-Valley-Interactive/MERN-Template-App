import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import Home from "./core/Home";
import Users from "./user/Users";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import Signin from "./auth/Signin";
import Signup from "./user/Signup";

const MainRouter = () => {
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <div>
      <Menu />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/edit/:userId" element={<PrivateRoute authCallback={EditProfile.getAuthInfo}><EditProfile /></PrivateRoute>} />
        <Route path="/user/:userId" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default MainRouter;