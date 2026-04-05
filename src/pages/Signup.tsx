import { motion } from "motion/react";
import { Send, Mail, Lock, User, ArrowRight, ChevronLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { VideoBackground } from "../components/VideoBackground";

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulando una llamada a la API
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-vuelo-blue selection:text-white">
      <VideoBackground />
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-vuelo-blue/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-vuelo-indigo/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-vuelo-blue transition-colors mb-8 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <Send className="text-[#0056d2] w-14 h-14 -rotate-12 fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px]" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold mb-2 text-gray-900">Crea tu cuenta</h1>
          <p className="text-gray-500">Únete a la red de Vuelo Email hoy mismo</p>
        </div>

        <form onSubmit={handleSignup} className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] space-y-6 border border-gray-100 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 ml-1">Nombre Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                required
                type="text" 
                placeholder="Juan Pérez"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vuelo-blue/20 focus:border-vuelo-blue transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 ml-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                required
                type="email" 
                placeholder="usuario@vuelo.email"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vuelo-blue/20 focus:border-vuelo-blue transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vuelo-blue/20 focus:border-vuelo-blue transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-2">
            <ShieldCheck className="w-5 h-5 text-vuelo-blue" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Tus datos están protegidos por el protocolo de seguridad de Vuelo.
            </p>
          </div>

          <button 
            disabled={isLoading}
            type="submit"
            className="w-full bg-vuelo-blue text-white py-4 rounded-2xl font-bold text-lg hover:bg-vuelo-blue/90 transition-all shadow-lg shadow-vuelo-blue/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Crear Cuenta
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-gray-500 text-sm">
              ¿Ya tienes una cuenta? <Link to="/login" className="text-vuelo-blue font-bold hover:underline">Inicia sesión</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
