export default function Card({ className = "", children }) {
    return (
        <div
            className={`rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-lg backdrop-blur-sm ${className}`}
        >
            {children}
        </div>
    );
}
