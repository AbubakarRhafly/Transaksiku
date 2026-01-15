import Card from "../../components/Card.jsx";
import Heading from "../../components/Heading.jsx";
import { useDashboardStatsQuery } from "../../utils/services/queryHooks.js";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#2563eb","#f59e0b","#10b981","#ef4444","#6b7280","#38bdf8"];

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboardStatsQuery();

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="bg-white">
        <Heading title="Overview" subtitle="Statistik utama" />
        {isLoading ? (
          <p className="text-sm text-slate-500">Memuat statistik...</p>
        ) : isError ? (
          <p className="text-sm text-red-600">Gagal memuat data.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs text-slate-500">Total saldo</p>
              <p className="text-lg font-semibold text-blue-700">{new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(data.saldoTotal)}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs text-slate-500">Transaksi hari ini</p>
              <p className="text-lg font-semibold text-emerald-700">{data.transaksiHariIni}</p>
            </div>
          </div>
        )}
      </Card>

      <Card className="bg-white">
        <Heading title="Grafik 7 hari" subtitle="Total nominal per hari" />
        {isLoading ? (
          <p className="text-sm text-slate-500">Memuat grafik...</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={data?.line7days || []}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card className="bg-white">
        <Heading title="Top 5 penerima" subtitle="Bar chart" />
        {isLoading ? (
          <p className="text-sm text-slate-500">Memuat grafik...</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={data?.topRecipients || []}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card className="bg-white">
        <Heading title="Distribusi kategori" subtitle="Pie chart" />
        {isLoading ? (
          <p className="text-sm text-slate-500">Memuat grafik...</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Legend />
                <Pie data={data?.kategoriPie || []} dataKey="value" nameKey="name" outerRadius={80}>
                  {(data?.kategoriPie || []).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
}

