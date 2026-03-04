import Scaffold from "layouts/Scaffold";
import { Personagens, Home, About, Tirinhas } from "pages";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Scaffold>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personagens" element={<Personagens />} />
        <Route path="/tiras" element={<Tirinhas />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/Personagens" element={<Navigate to="/personagens" replace />} />
        <Route path="/Tiras" element={<Navigate to="/tiras" replace />} />
        <Route path="/Sobre" element={<Navigate to="/sobre" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Scaffold>
  );
};

export default AppRoutes;
