import Heading from "../components/Heading.jsx";
import Button from "../components/Button.jsx";

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
                            Dashboard
                        </p>
                        <Heading
                            title="Transfer Antar Rekening"
                            subtitle="Kelola dan pantau transaksi transfer Anda secara real-time."
                        />
                    </div>
                    {children}
                </section>
            </main>
        </div>
    );
}
