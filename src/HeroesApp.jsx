import { AuthProvider } from "./auth/context/AuthProvider";
import AppRouter from "./router/AppRouter";

export default function HeroesApp() {
  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  );
}
