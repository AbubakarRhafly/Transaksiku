export default function Heading({ title, subtitle, align = "left" }) {
    const alignClass =
        align === "center"
            ? "text-center"
            : align === "right"
                ? "text-right"
                : "text-left";

    return (
        <div className={`mb-2 ${alignClass}`}>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {subtitle && (
                <p className="mt-1 text-xs md:text-sm text-slate-500">{subtitle}</p>
            )}
        </div>
    );
}
