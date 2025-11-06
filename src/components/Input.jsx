export default function Input({
    label,
    type = "text",
    textarea = false,
    className = "",
    ...rest
}) {
    const base =
        "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200";

    return (
        <label className="flex flex-col gap-1 text-sm text-slate-800">
            {label}
            {textarea ? (
                <textarea
                    className={`${base} min-h-[80px] resize-y ${className}`}
                    {...rest}
                />
            ) : (
                <input type={type} className={`${base} ${className}`} {...rest} />
            )}
        </label>
    );
}
