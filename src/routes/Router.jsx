import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/Auth/Login.jsx";
import TransferPage from "../pages/Transfer/TransferPage.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { confirmLogout } from "../utils/helpers/SwalHelpers.jsx";

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
    const location = useLocation();
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

    const adminRouteElement = isAuthed ? (
    <AdminLayout user={user} onLogout={handleLogout}>
        <TransferPage currentUser={user} />
    </AdminLayout>
    ) : (
    <Navigate to="/" replace />
    );

    return (
    <div className="app-root">
        <main className="app-main">
        <Routes>
            <Route
            path="/"
            element={
                isAuthed ? (
                <Navigate to="/admin/transfer" replace />
                ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
                )
            }
            />
            <Route path="/admin/transfer" element={adminRouteElement} />
            <Route
            path="*"
            element={<Navigate to={isAuthed ? "/admin/transfer" : "/"} replace />}
            />
        </Routes>
        </main>
    </div>
    );
}
