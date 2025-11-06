export const dummyUser = {
    email: "user@transaksiku.test",
    password: "123456",
    name: "Abubakar Rhafly Eka Putera",
    accountNumber: "1234567890",
};

export const dummyAccounts = [
    { accountNumber: "1234567890", label: "Rekening Utama - Abubakar Rhafly Eka Putera" },
    { accountNumber: "9876543210", label: "Tabungan Anak" },
    { accountNumber: "5556667777", label: "Rekening Bisnis" },
];

export const dummyTransactions = [
    {
        id: 1,
        date: "01/11/2025 09.15",
        accountNumber: "9876543210",
        amount: 150000,
        message: "Uang saku bulan November",
    },
    {
        id: 2,
        date: "03/11/2025 14.30",
        accountNumber: "5556667777",
        amount: 750000,
        message: "Pembayaran tagihan",
    },
];
