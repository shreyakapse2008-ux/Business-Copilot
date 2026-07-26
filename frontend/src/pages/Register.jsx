import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Building2, Mail, Lock, Loader2, Sparkles } from "lucide-react";
import api from "../services/api";
import "../styles/login.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", form);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");

    } catch (err) {
      const msg = err.response?.data?.detail || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-login">
      <div className="bg-circle circle-one"></div>
      <div className="bg-circle circle-two"></div>
      <div className="bg-circle circle-three"></div>

      <motion.div
        className="login-glass"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="logo-section">
          <div className="ai-badge">
            <Sparkles size={15} />
            Powered by AI
          </div>
          <h1>BusinessCopilot</h1>
          <p>Create your account to get started</p>
        </div>

        <div className="welcome">
          <h2>Create Account 🚀</h2>
          <p>Join BusinessCopilot and manage meetings with AI.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <User size={20} />
            <input
              type="text"
              name="name"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>Full Name</label>
          </div>

          <div className="input-box">
            <Building2 size={20} />
            <input
              type="text"
              name="company"
              placeholder=" "
              value={form.company}
              onChange={handleChange}
            />
            <label>Company Name</label>
          </div>

          <div className="input-box">
            <Mail size={20} />
            <input
              type="email"
              name="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="input-box">
            <Lock size={20} />
            <input
              type="password"
              name="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            <label>Password</label>
          </div>

          {error && <div className="login-error">{error}</div>}

          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <div className="register">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </div>

        <footer>
          © 2026 BusinessCopilot
          <br />
          Made with ❤️ using AI
        </footer>
      </motion.div>
    </div>
  );
}

export default Register;
