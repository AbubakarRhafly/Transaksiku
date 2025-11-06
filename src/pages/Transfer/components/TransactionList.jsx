import Button from "../../../components/Button.jsx";
import { confirmClearTransactions } from "../../../utils/helpers/SwalHelpers.jsx";
import TransactionCard from "./TransactionCard.jsx";

export default function TransactionList({ transactions, isLoading, onClearAll }) {
    const handleClear = () => {
        if (!transactions.length) return;
        confirmClearTransactions(onClearAll);
    };

    return (
        <div>
            <div className="transactions-header">
                <span className="transactions-count">
                    {isLoading
                        ? "Memuat data transaksi..."
                        : transactions.length
                            ? `${transactions.length} transaksi`
                            : "Belum ada transaksi"}
                </span>
                <Button
                    variant="outline"
                    type="button"
                    onClick={handleClear}
                    disabled={!transactions.length || isLoading}
                >
                    Hapus semua
                </Button>
            </div>

            {isLoading ? (
                <p className="transactions-empty">Sedang memuat riwayat transaksi...</p>
            ) : !transactions.length ? (
                <p className="transactions-empty">
                    Belum ada transaksi. Silakan lakukan transfer terlebih dahulu.
                </p>
            ) : (
                <div className="transactions-list">
                    {transactions.map((tx) => (
                        <TransactionCard key={tx.id} transaction={tx} />
                    ))}
                </div>
            )}
        </div>
    );
}
