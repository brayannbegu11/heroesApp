import { Routes, Route } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import HeroesRoutes from "../heroes/routes/HeroesRoutes";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="login" element={
          <PublicRouter>
            <LoginPage/>
          </PublicRouter>
        } />
        <Route path="/*" element= {
          <PrivateRouter>
            <HeroesRoutes />
          </PrivateRouter>
        } />
      </Routes>
    </>
  );
}
