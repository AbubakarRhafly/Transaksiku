import Button from "../../../components/Button.jsx";
import TransactionCard from "./TransactionCard.jsx";
import { confirmClearTransactions } from "../../../utils/helpers/SwalHelpers.jsx";

export default function TransactionList({
    transactions,
    isLoading,
    onClearAll,
}) {
    const handleClear = () => {
        if (!transactions.length || isLoading) return;
        confirmClearTransactions(onClearAll);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-slate-500">
                    {isLoading
                        ? "Memuat data transaksi..."
                        : transactions.length
                            ? `${transactions.length} transaksi`
                            : "Belum ada transaksi"}
                </span>
                <Button
                    variant="danger"
                    type="button"
                    onClick={handleClear}
                    disabled={!transactions.length || isLoading}
                    className="px-4 py-1.5 text-xs md:text-sm"
                >
                    Hapus semua
                </Button>
            </div>

            {isLoading ? (
                <p className="text-sm text-slate-400">
                    Sedang memuat riwayat transaksi...
                </p>
            ) : !transactions.length ? (
                <p className="text-sm text-slate-400">
                    Belum ada transaksi. Silakan lakukan transfer terlebih dahulu.
                </p>
            ) : (
                <div className="mt-1 flex max-h-96 flex-col gap-2 overflow-y-auto pr-1">
                    {transactions.map((tx) => (
                        <TransactionCard key={tx.id} transaction={tx} />
                    ))}
                </div>
            )}
        </div>
    );
}
