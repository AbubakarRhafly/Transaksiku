import Heading from "../components/Heading.jsx";
import Button from "../components/Button.jsx";
import { NavLink } from "react-router-dom";

export default function AdminLayout({ user, onLogout, children }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* HEADER */}
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-gradient-to-r from-blue-700 to-blue-500 px-4 md:px-10 text-white shadow-lg">
                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.32em] uppercase">
                        Transaksiku
                    </span>
                    <span className="hidden text-xs text-blue-100 md:inline">
                        Internet Banking Simulation
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="hidden text-sm md:inline">
                        Hi,&nbsp;
                        <span className="font-semibold">{user?.name}</span>
                    </span>
                    <Button variant="outline" type="button" onClick={onLogout}>
                        Logout
                    </Button>
                </div>
            </header>

            {/* CONTENT */}
            <main className="flex-1">
                <section className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                            Admin
                        </p>
                        <Heading
                            title="Transaksiku Admin"
                            subtitle="Kelola data dan analitik."
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {[
                                { to: "/admin/dashboard", label: "Dashboard" },
                                { to: "/admin/transfer", label: "Transfer" },
                                { to: "/admin/rekening", label: "Rekening" },
                                { to: "/admin/laporan", label: "Laporan" },
                                { to: "/admin/settings", label: "Settings" },
                            ].map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `rounded-full px-4 py-1.5 text-xs font-semibold ${isActive ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-slate-200"}`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    {children}
                </section>
            </main>
        </div>
    );
}
