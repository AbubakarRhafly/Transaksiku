import Swal from "sweetalert2";

export const confirmLogout = (onConfirm) => {
    Swal.fire({
        title: "Logout",
        text: "Yakin ingin keluar dari aplikasi?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, logout",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (res.isConfirmed && typeof onConfirm === "function") {
            onConfirm();
        }
    });
};

export const confirmClearTransactions = (onConfirm) => {
    Swal.fire({
        title: "Hapus semua transaksi?",
        text: "Data yang sudah dihapus tidak dapat dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (res.isConfirmed && typeof onConfirm === "function") {
            onConfirm();
        }
    });
};
