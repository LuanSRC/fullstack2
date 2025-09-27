import { Route, Routes, Navigate } from "react-router-dom";
// Components
import Layout from "../components/Layout.jsx";
import Home from "../components/Home.jsx";
import ListCars from "../components/ListCars.jsx";
import CreateCar from "../components/CreateCar.jsx";
import EditCar from "../components/EditCar.jsx";

// Páginas de Usuários
import ListUsers from "../components/ListUsers.jsx";
import CreateUser from "../components/CreateUser.jsx";
import EditUser from "../components/EditUser.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* Veículos */}
        <Route path="/cars" element={<ListCars />} />
        <Route path="/cars/new" element={<CreateCar />} />
        <Route path="/cars/:id/edit" element={<EditCar />} />
        {/* Usuários */}
        <Route path="/users" element={<ListUsers />} />
        <Route path="/users/new" element={<CreateUser />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
