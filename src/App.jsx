import Router from "./routes/Router.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="min-h-screen bg-slate-50/90 backdrop-blur">
        <Router />
      </div>
    </div>
  );
}
