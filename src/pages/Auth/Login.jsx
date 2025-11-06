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
        }, 800);
    };

    return (
        <div className="login-page">
            <Card className="login-card">
                <Heading
                    title="Transaksiku"
                    subtitle="Silakan login untuk mengakses halaman transfer."
                    align="center"
                />

                <form className="login-form" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="user@transaksiku.test"
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

                    <Button
                        className="login-button"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Memproses..." : "Login"}
                    </Button>
                </form>

                <div className="login-hint">
                    <p>Gunakan akun dummy:</p>
                    <code>
                        Email: {dummyUser.email} | Password: {dummyUser.password}
                    </code>
                </div>
            </Card>
        </div>
    );
}
