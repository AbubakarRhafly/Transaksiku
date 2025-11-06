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
        <article className="transaction-card">
            <div className="transaction-main">
                <div className="transaction-account">
                    Ke: {transaction.accountNumber}
                </div>
                <div className="transaction-date">{transaction.date}</div>
                {transaction.message && (
                    <div className="transaction-message">
                        Pesan: {transaction.message}
                    </div>
                )}
            </div>
            <div className="transaction-right">
                <div className="transaction-amount">
                    {formatCurrency(transaction.amount)}
                </div>
                <div className="transaction-label">Transfer keluar</div>
            </div>
        </article>
    );
}
