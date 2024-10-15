import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MainLayout } from "./layouts/MainLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { MenuPage } from "./pages/MenuPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ProductPage } from "./pages/ProductPage";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  

  return (
    <Routes>
      <Route
        path=""
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
