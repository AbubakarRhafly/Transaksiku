import { useState } from "react";
import Card from "../../components/Card.jsx";
import Heading from "../../components/Heading.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import { dummyUser } from "../../utils/data/Dummy.js";
import { showError, showSuccess } from "../../utils/helpers/ToastHelpers.jsx";

export default function Login({ onLoginSuccess }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            showError("Email dan password wajib diisi.");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            if (
                form.email.trim() === dummyUser.email &&
                form.password.trim() === dummyUser.password
            ) {
                showSuccess("Login berhasil.");
                onLoginSuccess(dummyUser);
            } else {
                showError("Email atau password salah.");
            }
            setIsSubmitting(false);
        }, 700);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="mb-4 flex flex-col items-center gap-1">
                    <span className="rounded-full bg-slate-900/80 px-4 py-1 text-[10px] font-semibold tracking-[0.28em] text-blue-100 uppercase">
                        Transaksiku
                    </span>
                    <p className="text-xs text-slate-400">
                        Internet Banking • Simulasi Transfer
                    </p>
                </div>

                <Card className="w-full bg-white/95 shadow-2xl">
                    <Heading
                        title="Masuk ke Akun"
                        subtitle="Gunakan akun dummy yang sudah disediakan untuk mencoba fitur."
                        align="center"
                    />

                    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            placeholder={dummyUser.email}
                            value={form.email}
                            onChange={handleChange}
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="123456"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <Button className="mt-2 w-full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Memproses..." : "Login"}
                        </Button>
                    </form>

                    <div className="mt-4 text-xs text-slate-500">
                        <p className="mb-1">Akun dummy:</p>
                        <code className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-700">
                            Email: {dummyUser.email} | Password: {dummyUser.password}
                        </code>
                    </div>
                </Card>
            </div>
        </div>
    );
}
