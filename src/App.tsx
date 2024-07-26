import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";

import { DashBoard, ManageCategories, ManageSubCategories } from "./pages";
import { Menu } from "./components";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.dashBoard} element={<DashBoard />} />
        <Route path={ROUTES.manageCategories} element={<ManageCategories />} />
        <Route path={ROUTES.manageSubCategories} element={<ManageSubCategories />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="flex flex-col md:flex-row w-full bg-white-color">
      <div className="w-full md:w-[23%] lg:w-[23%] bg-white-color">
        <Menu />
      </div>
      <div className="flex-1 p-4 md:p-8 bg-white-color">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
