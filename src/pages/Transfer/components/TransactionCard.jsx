function formatCurrency(amount) {
    if (amount == null || Number.isNaN(Number(amount))) return "-";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function TransactionCard({ transaction }) {
    return (
        <article className="flex items-start justify-between gap-3 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 px-4 py-3 text-slate-50 shadow-lg">
            <div className="space-y-1">
                <div className="text-sm font-semibold">
                    Ke: {transaction.accountNumber}
                </div>
                <div className="text-[11px] text-blue-100">{transaction.date}</div>
                <div className="text-sm font-semibold">
                    {formatCurrency(transaction.amount)}
                </div>
                {transaction.message && (
                    <div className="text-xs text-blue-100">
                        Pesan: {transaction.message}
                    </div>
                )}
            </div>
            <div className="flex flex-col items-end justify-between gap-1 text-[11px] text-blue-100">
                <span className="rounded-full bg-white/10 px-2 py-0.5">
                    Transfer keluar
                </span>
            </div>
        </article>
    );
}
