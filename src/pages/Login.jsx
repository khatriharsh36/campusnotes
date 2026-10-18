import { useState } from "react";
import FormInput from "../components/FormInput";
import { validateLoginEmail, validatePassword } from "../utils/validation";

export default function Login({ onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loggedIn, setLoggedIn] = useState(false);

  const errors = {
    email: validateLoginEmail(form.email),
    password: validatePassword(form.password),
  };

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (errors.email || errors.password) return;
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (
      <div>
        <div className="page-banner">
          <div className="page-banner-inner">
            <p className="page-banner-label">✅ Authenticated</p>
            <h1 className="page-banner-title">Welcome Back!</h1>
            <p className="page-banner-subtitle">You are now signed in to CampusNotes</p>
          </div>
        </div>
        <div className="login-page-wrap">
          <div className="login-success-card card">
            <div className="success-icon">✓</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Signed in successfully!</h2>
            <p className="muted">Logged in as <strong>{form.email}</strong></p>
            
            <div className="success-actions">
              <button className="btn btn-primary" onClick={() => onNavigate("explore")}>
                Explore Resources
              </button>
              <button className="btn btn-outline" onClick={() => {
                setLoggedIn(false);
                setForm({ email: "", password: "" });
                setTouched({ email: false, password: false });
              }}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-banner">
        <div className="page-banner-inner">
          <p className="page-banner-label">🔐 Account</p>
          <h1 className="page-banner-title">Sign In</h1>
          <p className="page-banner-subtitle">Access your CampusNotes account</p>
        </div>
      </div>

      <div className="login-page-wrap">
        <div className="login-card card">
          <div className="login-header">
            <div className="login-brand-icon">📚</div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your CampusNotes account</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <FormInput
              label="College Email" id="login-email" type="email"
              placeholder="you@college.edu"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => touch("email")}
              error={errors.email} touched={touched.email}
            />
            <FormInput
              label="Password" id="login-password" type="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              onBlur={() => touch("password")}
              error={errors.password} touched={touched.password}
            />
            <button type="submit" className="btn btn-primary btn-lg submit-btn" style={{ marginTop: "0.5rem" }}>
              Sign In →
            </button>
          </form>

          {/* <p className="login-disclaimer">
            ⚠️ Simulated login — for demonstration purposes only.
          </p> */}
          <p className="login-signup">
            Don't have an account?{" "}
            <button className="link-btn" onClick={() => onNavigate("upload")}>
              Upload a resource to get started
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
