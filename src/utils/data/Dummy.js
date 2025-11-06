// Data user dummy
export const dummyUser = {
    email: "user@transaksiku.com",
    password: "123456",
    name: "Abubakar Rhalfy Eka Putera",
    accountNumber: "1234567890",
    saldo: 2500000,
};

export const transaksilist = [
    {
        id: "TRX001",
        tanggal: "2025-04-20",
        tujuan: "Budi Santoso",
        nominal: 500000,
        catatan: "Bayar utang",
        status: "Berhasil",
    },
    {
        id: "TRX002",
        tanggal: "2025-04-18",
        tujuan: "Siti Aminah",
        nominal: 250000,
        catatan: "Transfer pulsa",
        status: "Berhasil",
    },
    {
        id: "TRX003",
        tanggal: "2025-04-15",
        tujuan: "Ahmad Fauzi",
        nominal: 1000000,
        catatan: "Biaya kuliah",
        status: "Berhasil",
    },
];

// daftar tujuan untuk dropdown rekening tujuan
export const dummyAccounts = [
    { accountNumber: "9876543210", label: "Budi Santoso" },
    { accountNumber: "081234567890", label: "Siti Aminah" },
    { accountNumber: "5556667777", label: "Ahmad Fauzi" },
];

// Supaya komponen lain tetap jalan, turunkan ke bentuk yang mereka pakai
export const dummyTransactions = transaksilist.map((trx) => ({
    id: trx.id,
    date: trx.tanggal,
    accountNumber: trx.tujuan,
    amount: trx.nominal,
    message: trx.catatan,
    status: trx.status,
}));
