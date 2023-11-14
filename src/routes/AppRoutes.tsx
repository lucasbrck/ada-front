import Scaffold from "layouts/Scaffold";
import { Personagens, Home } from "pages";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Scaffold>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Personagens" element={<Personagens />} />
      </Routes>
    </Scaffold>
  );
};

export default AppRoutes;
