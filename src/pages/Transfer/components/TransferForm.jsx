import Input from "../../../components/Input.jsx";
import Button from "../../../components/Button.jsx";

function formatCurrency(amount) {
    if (amount == null || Number.isNaN(Number(amount))) return "-";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function TransferForm({
    accounts,
    formData,
    onChange,
    onSubmit,
    isSubmitting,
    currentUser,
    balance,
    templates = [],
    onSelectTemplate,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isSubmitting) onSubmit();
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Rekening sumber */}
            <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Rekening sumber
                </p>
                <div className="inline-flex min-w-[260px] items-center rounded-2xl bg-gradient-to-r from-blue-500 to-blue-800 px-4 py-3 text-slate-50 shadow-lg">
                    <div>
                        <div className="text-sm font-semibold">
                            {currentUser?.name}
                        </div>
                        <div className="text-[11px] text-blue-100">
                            {currentUser?.accountNumber}
                        </div>
                        <div className="mt-1 text-[11px] text-blue-100">
                            Saldo: {formatCurrency(balance)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Input utama */}
            <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-800">
                    Nomor Rekening Tujuan
                    <select
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
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

            <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-800">
                    Gunakan Template
                    <select
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                        onChange={(e) => onSelectTemplate?.(e.target.value)}
                    >
                        <option value="">Pilih template transfer</option>
                        {templates.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </select>
                </label>
                <Input
                    label="Pesan (opsional)"
                    textarea
                    placeholder="Contoh: Uang saku, bayar tagihan, dll."
                    value={formData.message}
                    onChange={(e) => onChange("message", e.target.value)}
                />
            </div>

            <div className="mt-2 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Transfer Sekarang"}
                </Button>
            </div>
        </form>
    );
}
