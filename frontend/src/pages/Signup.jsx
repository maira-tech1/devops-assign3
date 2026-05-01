import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://43.205.238.40:3000/api/auth/register", {
        email,
        password,
      });

      alert("Signup successful 🎉");
      navigate("/");
    } catch (err) {
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 font-sans text-slate-800">
      
      <div className="bg-white/95 backdrop-blur-xl shadow-2xl border border-white/50 rounded-2xl p-10 w-[420px]">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
            <span className="text-3xl block text-white drop-shadow-md">⚡</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Nexus ERP Registration
          </h2>
          <p className="text-indigo-600/80 font-medium text-sm mt-2">
            Join the Enterprise Management Portal
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="signupEmail">Email</label>
            <input
              id="signupEmail"
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="signupPassword">Password</label>
            <input
              id="signupPassword"
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            id="signupBtn"
            onClick={handleSignup}
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition shadow-sm mt-2"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6 text-center">
          <p
            className="text-indigo-600 font-medium text-sm hover:underline cursor-pointer transition-colors"
            onClick={() => navigate("/")}
          >
            Already have an account? Login here
          </p>
        </div>
      </div>
    </div>
  );
}
