import Heading from "../components/Heading.jsx";
import Button from "../components/Button.jsx";

export default function AdminLayout({ user, onLogout, children }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            {/* HEADER */}
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-gradient-to-r from-blue-700 to-blue-500 px-4 md:px-10 text-white shadow-lg">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-[0.28em] uppercase">
                        Transaksiku
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="hidden text-sm md:inline">
                        Hi, {user?.name}
                    </span>
                    <Button variant="outline" type="button" onClick={onLogout}>
                        Logout
                    </Button>
                </div>
            </header>

            {/* CONTENT */}
            <main className="flex-1">
                <section className="mx-auto max-w-5xl px-4 py-6 space-y-4">
                    <Heading
                        title="Dashboard Transfer"
                        subtitle="Simulasi sederhana transaksi transfer uang."
                    />
                    {children}
                </section>
            </main>
        </div>
    );
}
