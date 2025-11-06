export default function Heading({ title, subtitle, align = "left" }) {
    return (
        <div className={`heading heading-${align}`}>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
    );
}
