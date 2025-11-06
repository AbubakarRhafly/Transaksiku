export default function Button({
    variant = "primary",
    className = "",
    children,
    ...rest
}) {
    const base =
        "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 focus-visible:ring-offset-slate-100",
        outline:
            "border border-slate-200 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white focus-visible:ring-offset-blue-600",
        danger:
            "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 focus-visible:ring-offset-slate-100",
    };

    const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
}
