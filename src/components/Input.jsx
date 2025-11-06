export default function Input({
    label,
    type = "text",
    textarea = false,
    className = "",
    ...rest
}) {
    return (
        <label className="form-label">
            {label}
            {textarea ? (
                <textarea className={`form-textarea ${className}`} {...rest} />
            ) : (
                <input type={type} className={`form-input ${className}`} {...rest} />
            )}
        </label>
    );
}
