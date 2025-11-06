import Input from "../../../components/Input.jsx";
import Button from "../../../components/Button.jsx";

export default function TransferForm({
    accounts,
    formData,
    onChange,
    onSubmit,
    isSubmitting,
    currentUser,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isSubmitting) onSubmit();
    };

    return (
        <form className="transfer-form" onSubmit={handleSubmit}>
            <div className="account-summary">
                <p className="section-subtitle" style={{ marginBottom: "0.35rem" }}>
                    Rekening sumber
                </p>
                <div className="account-summary-box">
                    <div>
                        <div className="account-name">{currentUser?.name}</div>
                        <div className="account-number">{currentUser?.accountNumber}</div>
                    </div>
                </div>
            </div>

            <div className="transfer-form-grid">
                <label className="form-label">
                    Nomor Rekening Tujuan
                    <select
                        className="form-select"
                        value={formData.accountNumber}
                        onChange={(e) => onChange("accountNumber", e.target.value)}
                    >
                        <option value="">Pilih rekening tujuan</option>
                        {accounts.map((acc) => (
                            <option key={acc.accountNumber} value={acc.accountNumber}>
                                {acc.label} ({acc.accountNumber})
                            </option>
                        ))}
                    </select>
                </label>

                <Input
                    label="Nominal Transfer (Rp)"
                    type="number"
                    min={1000}
                    placeholder="Minimal 1000"
                    value={formData.amount}
                    onChange={(e) => onChange("amount", e.target.value)}
                />
            </div>

            <Input
                label="Pesan (opsional)"
                textarea
                placeholder="Contoh: Uang saku, bayar tagihan, dll."
                value={formData.message}
                onChange={(e) => onChange("message", e.target.value)}
                style={{ marginTop: "0.75rem" }}
            />

            <div style={{ marginTop: "1rem", textAlign: "right" }}>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Transfer Sekarang"}
                </Button>
            </div>
        </form>
    );
}
