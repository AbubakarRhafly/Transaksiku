import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../pages/Auth/Login.jsx";
import TransferPage from "../pages/Transfer/TransferPage.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { confirmLogout } from "../utils/helpers/SwalHelpers.jsx";
import Dashboard from "../pages/Admin/Dashboard.jsx";
import Settings from "../pages/Admin/Settings.jsx";
import RekeningPage from "../pages/Rekening/RekeningPage.jsx";
import LaporanPage from "../pages/Laporan/LaporanPage.jsx";

export default function Router() {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("authUser");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const navigate = useNavigate();
    const isAuthed = !!user;

    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === "authUser") {
                setUser(e.newValue ? JSON.parse(e.newValue) : null);
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
        navigate("/admin/transfer", { replace: true });
    };

    const handleLogout = () => {
        confirmLogout(() => {
            localStorage.removeItem("authUser");
            setUser(null);
            navigate("/", { replace: true });
        });
    };

    const makeAdminElement = (child) =>
        isAuthed ? (
            <AdminLayout user={user} onLogout={handleLogout}>
                {child}
            </AdminLayout>
        ) : (
            <Navigate to="/" replace />
        );

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isAuthed ? (
                        <Navigate to="/admin/dashboard" replace />
                    ) : (
                        <Login onLoginSuccess={handleLoginSuccess} />
                    )
                }
            />
            <Route path="/admin/dashboard" element={makeAdminElement(<Dashboard />)} />
            <Route path="/admin/transfer" element={makeAdminElement(<TransferPage currentUser={user} />)} />
            <Route path="/admin/rekening" element={makeAdminElement(<RekeningPage />)} />
            <Route path="/admin/laporan" element={makeAdminElement(<LaporanPage />)} />
            <Route path="/admin/settings" element={makeAdminElement(<Settings />)} />
            <Route
                path="*"
                element={<Navigate to={isAuthed ? "/admin/dashboard" : "/"} replace />}
            />
        </Routes>
    );
}
