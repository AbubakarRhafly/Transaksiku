import { useMemo, useState } from "react";
import Card from "../../components/Card.jsx";
import Heading from "../../components/Heading.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import { useSavedAccountsQuery, useCreateAccountMutation, useDeleteAccountsMutation, useUpdateAccountMutation } from "../../utils/services/queryHooks.js";
import { showError, showSuccess } from "../../utils/helpers/ToastHelpers.jsx";
import Swal from "sweetalert2";

export default function RekeningPage() {
  const { data, isLoading } = useSavedAccountsQuery();
  const createMut = useCreateAccountMutation();
  const updateMut = useUpdateAccountMutation();
  const deleteMut = useDeleteAccountsMutation();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [selected, setSelected] = useState([]);

  const filtered = useMemo(() => {
    const list = data || [];
    const term = q.toLowerCase();
    const f = term ? list.filter(a => a.name.toLowerCase().includes(term) || a.bank.toLowerCase().includes(term)) : list;
    return f;
  }, [data, q]);

  const totalPages = Math.max(1, Math.ceil((filtered?.length || 0) / pageSize));
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleCreate = async () => {
    const res = await Swal.fire({
      title: "Tambah rekening",
      html:
        '<input id="name" class="swal2-input" placeholder="Nama">' +
        '<input id="bank" class="swal2-input" placeholder="Bank">' +
        '<input id="acc" class="swal2-input" placeholder="Nomor rekening">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById("name").value.trim();
        const bank = document.getElementById("bank").value.trim();
        const accountNumber = document.getElementById("acc").value.trim();
        if (!name || !bank || !accountNumber) return Swal.showValidationMessage("Semua field wajib diisi");
        if (!/^[0-9]{6,}$/.test(accountNumber)) return Swal.showValidationMessage("Nomor rekening harus angka dan valid");
        return { name, bank, accountNumber };
      },
    });
    if (res.isConfirmed) {
      createMut.mutate(res.value, {
        onSuccess: () => showSuccess("Rekening ditambahkan"),
        onError: () => showError("Gagal menambah rekening"),
      });
    }
  };

  const handleEdit = async (item) => {
    const res = await Swal.fire({
      title: "Edit rekening",
      html:
        `<input id="name" class="swal2-input" placeholder="Nama" value="${item.name}">` +
        `<input id="bank" class="swal2-input" placeholder="Bank" value="${item.bank}">` +
        `<input id="acc" class="swal2-input" placeholder="Nomor rekening" value="${item.accountNumber}">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById("name").value.trim();
        const bank = document.getElementById("bank").value.trim();
        const accountNumber = document.getElementById("acc").value.trim();
        if (!name || !bank || !accountNumber) return Swal.showValidationMessage("Semua field wajib diisi");
        if (!/^[0-9]{6,}$/.test(accountNumber)) return Swal.showValidationMessage("Nomor rekening harus angka dan valid");
        return { name, bank, accountNumber };
      },
    });
    if (res.isConfirmed) {
      updateMut.mutate({ id: item.id, payload: res.value }, {
        onSuccess: () => showSuccess("Rekening diperbarui"),
        onError: () => showError("Gagal mengedit rekening"),
      });
    }
  };

  const handleDeleteSelected = () => {
    if (!selected.length) return;
    Swal.fire({
      title: `Hapus ${selected.length} rekening?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
    }).then(res => {
      if (res.isConfirmed) {
        deleteMut.mutate(selected, {
          onSuccess: () => { showSuccess("Rekening dihapus"); setSelected([]); },
          onError: () => showError("Gagal menghapus rekening"),
        });
      }
    });
  };

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white">
        <Heading title="Manajemen Rekening" subtitle="CRUD dengan React Query" />
        <div className="flex items-center gap-2">
          <Input label="Cari nama/bank" value={q} onChange={e => setQ(e.target.value)} />
          <Button type="button" onClick={handleCreate}>Tambah</Button>
          <Button type="button" variant="danger" onClick={handleDeleteSelected} disabled={!selected.length}>Hapus terpilih</Button>
        </div>
      </Card>

      <Card className="bg-white">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{isLoading ? "Memuat rekening..." : `${filtered.length} data`}</span>
          <div className="flex items-center gap-2">
            <Button type="button" onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}>Prev</Button>
            <span className="text-xs text-slate-600">Page {page}/{totalPages}</span>
            <Button type="button" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>Next</Button>
          </div>
        </div>
        {isLoading ? (
          <p className="text-sm text-slate-500">Memuat data...</p>
        ) : (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((a) => (
              <div key={a.id} className={`rounded-xl border border-slate-200 p-3 flex items-center justify-between ${selected.includes(a.id) ? "bg-blue-50" : "bg-white"}`}>
                <div>
                  <p className="text-sm font-semibold">{a.name}</p>
                  <p className="text-xs text-slate-500">{a.bank} • {a.accountNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={selected.includes(a.id)} onChange={() => toggleSelect(a.id)} />
                  <Button type="button" className="px-3 py-1 text-xs" onClick={() => handleEdit(a)}>Edit</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

