import Scaffold from "layouts/Scaffold";
import { Personagens, Home, About, Tirinhas } from "pages";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Scaffold>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Personagens" element={<Personagens />} />
        <Route path="/Tiras" element={<Tirinhas />} />
        <Route path="/Sobre" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Scaffold>
  );
};

export default AppRoutes;
