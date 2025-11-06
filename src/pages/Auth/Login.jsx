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
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
            <Card className="w-full max-w-md">
                <Heading
                    title="Transaksiku"
                    subtitle="Silakan login untuk mengakses halaman transfer."
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
                    <p>Gunakan akun dummy:</p>
                    <code className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                        Email: {dummyUser.email} | Password: {dummyUser.password}
                    </code>
                </div>
            </Card>
        </div>
    );
}
