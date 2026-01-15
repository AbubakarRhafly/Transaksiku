const names = [
    "Budi Santoso", "Della Septi", "Ahmad Fauzi", "Rina Kartika", "Dewi Lestari", "Andi Pratama", "Putri Maharani", "Joko Widodo", "Rudi Hartono", "Nadia Safira",
    "Fajar Nugraha", "Tono Subagio", "Bayu Saputra", "Agus Salim", "Aisyah Rahma", "Dimas Arya", "Elisa Pertiwi", "Farhan Syah", "Gita Cahyani", "Hendra Wijaya",
    "Imam Prasetyo", "Jasmine Aulia", "Kayla Putri", "Lukman Hakim", "Maya Salsabila", "Naufal Ardi", "Oksana Dwi", "Putu Arya", "Qori Annisa", "Rama Mahendra",
    "Salsa Aprilia", "Tegar Saputra", "Umar Faruq", "Vina Melati", "Wahyu Adi", "Yusuf Maulana", "Zahra Ayu"
];

const banks = ["Bank Nusantara", "Bank Sejahtera", "Bank Sentosa", "Bank Mandala", "Bank Cakrawala"];

export const savedAccounts = Array.from({ length: 22 }).map((_, i) => {
    const name = names[i % names.length];
    const bank = banks[i % banks.length];
    const num = String(9000000000 + i * 137).slice(0, 10);
    return { id: `ACC${i + 1}`, name, bank, accountNumber: num, addedAt: new Date(Date.now() - i * 86400000).toISOString() };
});

const statuses = ["Berhasil", "Pending", "Gagal"];
const categories = ["Transfer", "Top Up", "Pembayaran"];

const today = new Date();
function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const transactions = Array.from({ length: 60 }).map((_, i) => {
    const d = new Date(today.getTime() - randomBetween(0, 29) * 86400000);
    const recipient = savedAccounts[randomBetween(0, savedAccounts.length - 1)];
    const nominal = randomBetween(20000, 2000000);
    const status = statuses[randomBetween(0, statuses.length - 1)];
    const category = categories[randomBetween(0, categories.length - 1)];
    return {
        id: `TRX${String(i + 1).padStart(3, "0")}`,
        tanggal: d.toISOString().slice(0, 10),
        waktu: d.toTimeString().slice(0, 5),
        tujuan: recipient.name,
        rekeningTujuan: recipient.accountNumber,
        nominal,
        catatan: category === "Pembayaran" ? "Pembayaran tagihan" : category === "Top Up" ? "Top up e-wallet" : "Transfer rutin",
        status,
        kategori: category,
    };
});

export const dashboardStats = (() => {
    const totalNominal = transactions.reduce((s, t) => s + t.nominal, 0);
    const todayStr = today.toISOString().slice(0, 10);
    const todayCount = transactions.filter(t => t.tanggal === todayStr).length;
    const byCategory = categories.map(cat => ({
        name: cat,
        value: transactions.filter(t => t.kategori === cat).length
    }));
    const recipientsCount = savedAccounts.map(acc => ({
        name: acc.name,
        count: transactions.filter(t => t.tujuan === acc.name && t.status === "Berhasil").length
    })).sort((a, b) => b.count - a.count).slice(0, 5);
    const last7 = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(today.getTime() - (6 - i) * 86400000);
        const ds = d.toISOString().slice(0, 10);
        return {
            date: ds,
            total: transactions.filter(t => t.tanggal === ds && t.status === "Berhasil").reduce((s, t) => s + t.nominal, 0)
        };
    });
    return {
        saldoTotal: 2500000,
        transaksiHariIni: todayCount,
        totalNominal,
        kategoriPie: byCategory,
        topRecipients: recipientsCount,
        line7days: last7
    };
})();

export const transferTemplates = [
    { id: "TPL1", name: "Bayar listrik", accountNumber: savedAccounts[3].accountNumber, amount: 250000, message: "Tagihan bulan ini" },
    { id: "TPL2", name: "Kirim orang tua", accountNumber: savedAccounts[1].accountNumber, amount: 1000000, message: "Uang bulanan" },
    { id: "TPL3", name: "Top up e-wallet", accountNumber: savedAccounts[5].accountNumber, amount: 150000, message: "Isi saldo" },
];

