import { useState } from "react";
import Card from "../../components/Card.jsx";
import Heading from "../../components/Heading.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import { useTransactionsQuery } from "../../utils/services/queryHooks.js";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";

const COLORS = ["#2563eb","#f59e0b","#10b981","#ef4444","#6b7280","#38bdf8"];

export default function LaporanPage() {
  const [filters, setFilters] = useState({ dateStart: "", dateEnd: "", min: "", max: "", status: ["Berhasil","Pending","Gagal"], recipient: "" });
  const { data, isLoading } = useTransactionsQuery({
    dateStart: filters.dateStart || undefined,
    dateEnd: filters.dateEnd || undefined,
    min: filters.min ? Number(filters.min) : undefined,
    max: filters.max ? Number(filters.max) : undefined,
    status: filters.status,
    recipient: filters.recipient || undefined,
  });

  const statusCount = ["Berhasil","Pending","Gagal"].map(s => ({
    name: s,
    value: (data || []).filter(t => t.status === s).length
  }));
  const perDay = Object.values((data || []).reduce((acc, t) => {
    acc[t.tanggal] = acc[t.tanggal] || { date: t.tanggal, total: 0 };
    acc[t.tanggal].total += t.nominal;
    return acc;
  }, {})).sort((a,b) => a.date.localeCompare(b.date));
  const topRecipients = Object.values((data || []).reduce((acc, t) => {
    const k = t.tujuan; acc[k] = acc[k] || { name: k, count: 0 }; acc[k].count += 1; return acc;
  }, {})).sort((a,b) => b.count - a.count).slice(0,5);
  const totalTx = (data || []).length;
  const totalNominal = (data || []).reduce((s, t) => s + t.nominal, 0);
  const avgNominal = totalTx ? Math.round(totalNominal / totalTx) : 0;

  const setStatusChecked = (status, checked) => {
    setFilters(f => {
      const next = checked ? Array.from(new Set([...f.status, status])) : f.status.filter(s => s !== status);
      return { ...f, status: next };
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white">
        <Heading title="Laporan Transaksi" subtitle="Advanced filtering" />
        <div className="grid md:grid-cols-5 gap-3">
          <Input label="Dari tanggal" type="date" value={filters.dateStart} onChange={e => setFilters({ ...filters, dateStart: e.target.value })} />
          <Input label="Sampai tanggal" type="date" value={filters.dateEnd} onChange={e => setFilters({ ...filters, dateEnd: e.target.value })} />
          <Input label="Nominal min" type="number" value={filters.min} onChange={e => setFilters({ ...filters, min: e.target.value })} />
          <Input label="Nominal max" type="number" value={filters.max} onChange={e => setFilters({ ...filters, max: e.target.value })} />
          <Input label="Penerima" value={filters.recipient} onChange={e => setFilters({ ...filters, recipient: e.target.value })} />
        </div>
        <div className="mt-2 flex items-center gap-4">
          {["Berhasil","Pending","Gagal"].map(s => (
            <label key={s} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={filters.status.includes(s)} onChange={e => setStatusChecked(s, e.target.checked)} />
              {s}
            </label>
          ))}
          <Button type="button" onClick={() => setFilters({ dateStart:"",dateEnd:"",min:"",max:"",status:["Berhasil","Pending","Gagal"],recipient:"" })}>Reset</Button>
        </div>
      </Card>

      <Card className="bg-white">
        <Heading title="Summary Cards" subtitle="Ringkasan angka" />
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-xs text-slate-500">Total transaksi</p>
            <p className="text-lg font-semibold text-blue-700">{isLoading ? "-" : totalTx}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3">
            <p className="text-xs text-slate-500">Total nominal</p>
            <p className="text-lg font-semibold text-emerald-700">{isLoading ? "-" : new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(totalNominal)}</p>
          </div>
          <div className="rounded-xl bg-amber-50 p-3">
            <p className="text-xs text-slate-500">Rata-rata nominal</p>
            <p className="text-lg font-semibold text-amber-700">{isLoading ? "-" : new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(avgNominal)}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="bg-white">
          <Heading title="Trend Chart" subtitle="Nominal per hari" />
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={perDay}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-white">
          <Heading title="Status Distribution" subtitle="Pie chart" />
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Legend />
                <Pie data={statusCount} dataKey="value" nameKey="name" outerRadius={80}>
                  {statusCount.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="bg-white">
        <Heading title="Top Recipients" subtitle="Bar chart" />
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={topRecipients}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

