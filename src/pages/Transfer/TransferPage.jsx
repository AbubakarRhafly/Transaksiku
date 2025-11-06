import { useEffect, useState } from "react";
import Card from "../../components/Card.jsx";
import Heading from "../../components/Heading.jsx";
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
    const [balance, setBalance] = useState(
        currentUser?.saldo ?? currentUser?.balance ?? 0
    );

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
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)]">
            <Card className="relative flex flex-col gap-3">
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
                    balance={balance}
                />

                {isSubmitting && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-slate-900/30">
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-50 shadow-xl">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-500 border-t-blue-400" />
                            <span>Memproses transfer, mohon tunggu...</span>
                        </div>
                    </div>
                )}
            </Card>

            <Card>
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
