export default function Button({
    variant = "primary",
    className = "",
    children,
    ...rest
}) {
    const base = "btn";
    const variantClass = variant === "outline" ? "btn-outline" : "btn-primary";

    return (
        <button className={`${base} ${variantClass} ${className}`} {...rest}>
            {children}
        </button>
    );
}
