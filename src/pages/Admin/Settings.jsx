import Card from "../../components/Card.jsx";
import Heading from "../../components/Heading.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import useApp from "../../context/useApp.js";

export default function Settings() {
  const { theme, setTheme, profile, setProfile, security, setSecurity } = useApp();

  const handleProfile = (field, value) => setProfile({ ...profile, [field]: value });

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="bg-white">
        <Heading title="Profil" subtitle="Edit informasi pengguna" />
        <div className="space-y-3">
          <Input label="Nama" value={profile.name} onChange={e => handleProfile("name", e.target.value)} />
          <Input label="Email" type="email" value={profile.email} onChange={e => handleProfile("email", e.target.value)} />
          <Button type="button" onClick={() => setProfile({ ...profile })}>Simpan</Button>
        </div>
      </Card>

      <Card className="bg-white">
        <Heading title="App Settings" subtitle="Tema dan preferensi" />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Tema</span>
            <select className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm" value={theme} onChange={e => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Izinkan jadwal transfer</span>
            <input type="checkbox" checked={security.allowScheduledTransfer} onChange={e => setSecurity({ ...security, allowScheduledTransfer: e.target.checked })} />
          </div>
        </div>
      </Card>

      <Card className="bg-white">
        <Heading title="Security" subtitle="Pengaturan keamanan" />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Aktifkan Two-factor (dummy)</span>
            <input type="checkbox" checked={security.twoFA} onChange={e => setSecurity({ ...security, twoFA: e.target.checked })} />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500">Active sessions (dummy)</p>
            <div className="rounded-xl bg-slate-100 p-3 text-xs text-slate-700">
              <p>Chrome • Windows • Last active: now</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
