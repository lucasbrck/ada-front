import Scaffold from "layouts/Scaffold";
import { Personagens, Home, About,Tirinhas } from "pages";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Scaffold>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Personagens" element={<Personagens />} />
        <Route path="/Tiras" element={<Tirinhas/>}/>
        <Route path="/Sobre" element={<About/>}/>

      </Routes>
    </Scaffold>
  );
};

export default AppRoutes;
