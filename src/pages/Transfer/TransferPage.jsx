import { useEffect, useState } from "react";
import Heading from "../../components/Heading.jsx";
import Card from "../../components/Card.jsx";
import {
    dummyAccounts,
    dummyTransactions,
} from "../../utils/data/Dummy.js";
import { showError, showSuccess } from "../../utils/helpers/ToastHelpers.jsx";
import TransferForm from "./components/TransferForm.jsx";
import TransactionList from "./components/TransactionList.jsx";

export default function TransferPage({ currentUser }) {
    const [formData, setFormData] = useState({
        accountNumber: "",
        amount: "",
        message: "",
    });
    const [transactions, setTransactions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // saldo yang dimiliki user
    const [balance, setBalance] = useState(
        currentUser?.saldo ?? currentUser?.balance ?? 0
    );

    // kalau suatu saat currentUser berubah, sinkronkan lagi
    useEffect(() => {
        setBalance(currentUser?.saldo ?? currentUser?.balance ?? 0);
    }, [currentUser]);

    useEffect(() => {
        setIsInitialLoading(true);
        const t = setTimeout(() => {
            setTransactions(dummyTransactions);
            setIsInitialLoading(false);
        }, 1000);
        return () => clearTimeout(t);
    }, []);

    const handleFormChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmitTransfer = () => {
        if (!formData.accountNumber) {
            showError("Nomor rekening tujuan wajib diisi.");
            return;
        }
        const amountNumber = Number(formData.amount);
        if (!amountNumber || amountNumber < 1000) {
            showError("Nominal minimal adalah Rp 1.000.");
            return;
        }

        // CEK SALDO
        if (amountNumber > balance) {
            showError("Saldo tidak mencukupi untuk melakukan transfer ini.");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            const newTx = {
                id: Date.now(),
                date: new Date().toLocaleString("id-ID", {
                    dateStyle: "short",
                    timeStyle: "short",
                }),
                accountNumber: formData.accountNumber,
                amount: amountNumber,
                message: formData.message?.trim() || "",
            };

            // kurangi saldo
            setBalance((prev) => prev - amountNumber);

            setTransactions((prev) => [newTx, ...prev]);
            setFormData({ accountNumber: "", amount: "", message: "" });
            setIsSubmitting(false);
            showSuccess("Transfer berhasil.");
        }, 2000);
    };

    const handleClearAll = () => {
        setTransactions([]);
        showSuccess("Riwayat transaksi dihapus.");
    };

    return (
        <div className="transfer-page">
            <Card className="transfer-left">
                <Heading
                    title="Form Transfer"
                    subtitle="Lakukan transfer ke rekening tujuan (minimal Rp 1.000)."
                />
                <TransferForm
                    accounts={dummyAccounts}
                    formData={formData}
                    onChange={handleFormChange}
                    onSubmit={handleSubmitTransfer}
                    isSubmitting={isSubmitting}
                    currentUser={currentUser}
                    balance={balance}   // >> kirim saldo ke form
                />
                {isSubmitting && (
                    <div className="loading-overlay">
                        <div className="loading-modal">
                            <div className="loading-spinner" />
                            <p>Memproses transfer, mohon tunggu...</p>
                        </div>
                    </div>
                )}
            </Card>

            <Card className="transfer-right">
                <Heading
                    title="Riwayat Transaksi"
                    subtitle="Transaksi yang berhasil akan tampil secara dinamis."
                />
                <TransactionList
                    transactions={transactions}
                    isLoading={isInitialLoading}
                    onClearAll={handleClearAll}
                />
            </Card>
        </div>
    );
}
