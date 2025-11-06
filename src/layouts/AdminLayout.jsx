import Heading from "../components/Heading.jsx";
import Button from "../components/Button.jsx";

export default function AdminLayout({ user, onLogout, children }) {
    return (
    <div className="admin-layout">
        <header className="app-header">
        <div className="app-header-left">
            <span className="app-logo">Transaksiku</span>
        </div>
        <div className="app-header-right">
            <span className="user-name">Hi, {user?.name}</span>
            <Button variant="outline" type="button" onClick={onLogout}>
            Logout
            </Button>
        </div>
        </header>

        <section className="admin-content">
        <Heading
            title="Dashboard Transfer"
            subtitle="Simulasi sederhana transaksi transfer uang."
        />
        {children}
        </section>
    </div>
    );
}
