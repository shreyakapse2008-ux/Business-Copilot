import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

import "../styles/login.css";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const response = await api.post("/auth/login", { email, password });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");

    } catch (err) {

      const msg = err.response?.data?.detail || "Login failed. Please check your credentials.";
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

        initial={{
          opacity:0,
          y:40,
          scale:0.9
        }}

        animate={{
          opacity:1,
          y:0,
          scale:1
        }}

        transition={{
          duration:0.5
        }}

      >


        <div className="logo-section">


          <div className="logo-ring">

            <img

              src="/logo.png"

              alt="BusinessCopilot Logo"

              className="login-logo"

            />

          </div>



          <div className="ai-badge">

            <Sparkles size={15}/>

            Powered by AI

          </div>



          <h1>
            BusinessCopilot
          </h1>


          <p>
            AI Powered Meeting Assistant
          </p>


        </div>




        <div className="welcome">

          <h2>
            Welcome Back 👋
          </h2>


          <p>
            Sign in to continue managing your meetings with AI.
          </p>


        </div>





        <form onSubmit={handleLogin}>


          <div className="input-box">


            <Mail size={20}/>


            <input

              type="email"

              placeholder=" "

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              required

            />


            <label>
              Email Address
            </label>


          </div>





          <div className="input-box">


            <Lock size={20}/>


            <input

              type={showPassword ? "text" : "password"}

              placeholder=" "

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              required

            />


            <label>
              Password
            </label>




            <span

              className="eye"

              onClick={() =>
                setShowPassword(!showPassword)
              }

            >

              {
                showPassword
                ?
                <EyeOff size={20}/>
                :
                <Eye size={20}/>
              }


            </span>


          </div>






          <div className="login-options">


            <label>

              <input type="checkbox"/>

              Remember me

            </label>



            <a href="#">

              Forgot Password?

            </a>


          </div>


          {error && (
            <div className="login-error">
              {error}
            </div>
          )}






          <motion.button

            type="submit"

            className="login-btn"

            whileHover={{
              scale:1.03
            }}

            whileTap={{
              scale:0.96
            }}

            disabled={loading}

          >


            {

              loading

              ?

              <>

                <Loader2 className="spin"/>

                Signing In...

              </>

              :

              "Sign In"

            }


          </motion.button>




        </form>





        <div className="register">


          Don't have an account?


          <Link to="/register">

            Register

          </Link>


        </div>





        <footer>

          © 2026 BusinessCopilot

          <br/>

          Made with ❤️ using AI


        </footer>




      </motion.div>


    </div>

  );

}


export default Login;