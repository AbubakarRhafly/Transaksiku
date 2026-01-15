import { useEffect, useMemo, useState } from "react";
import AppContext from "./AppContextBase.js";

export default function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [security, setSecurity] = useState(() => {
    const raw = localStorage.getItem("security");
    return raw ? JSON.parse(raw) : { twoFA: false, sessions: [], allowScheduledTransfer: true };
  });
  const [profile, setProfile] = useState(() => {
    const raw = localStorage.getItem("profile");
    return raw ? JSON.parse(raw) : { name: "Pengguna Transaksiku", email: "user@transaksiku.com", avatar: "" };
  });

  useEffect(() => { localStorage.setItem("theme", theme); }, [theme]);
  useEffect(() => { localStorage.setItem("security", JSON.stringify(security)); }, [security]);
  useEffect(() => { localStorage.setItem("profile", JSON.stringify(profile)); }, [profile]);

  const value = useMemo(() => ({
    theme, setTheme,
    security, setSecurity,
    profile, setProfile,
  }), [theme, security, profile]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
