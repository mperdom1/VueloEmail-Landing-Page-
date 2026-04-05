import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  MessageSquare, 
  Shield, 
  Globe, 
  ArrowRight, 
  Menu, 
  X, 
  ChevronRight,
  Cloud,
  Send,
  Lock,
  Layers,
  User,
  Square,
  LogOut,
  AtSign,
  Eye,
  Smartphone,
  Layout
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoBackground } from "../components/VideoBackground";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative flex items-center justify-center">
            <Send className="text-[#0056d2] w-8 h-8 -rotate-12 fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px]" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">Vuelo<span className="text-vuelo-blue">Email</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-vuelo-blue transition-colors">Características</a>
          <Link to="/about" className="hover:text-vuelo-blue transition-colors">Nosotros</Link>
          <Link to="/info" className="hover:text-vuelo-blue transition-colors">Recursos</Link>
          <a href="#integration" className="hover:text-vuelo-blue transition-colors">Integración</a>
          <Link to="/login" className="bg-vuelo-dark text-white px-6 py-2.5 rounded-full hover:bg-vuelo-blue transition-all duration-300 font-semibold shadow-lg shadow-black/5">
            Acceso Web
          </Link>
        </div>

        <button className="md:hidden text-gray-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#features" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Características</a>
            <Link to="/about" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Nosotros</Link>
            <Link to="/info" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Recursos</Link>
            <a href="#integration" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Integración</a>
            <Link to="/login" className="bg-vuelo-blue text-white w-full py-4 rounded-xl font-bold text-center">Acceso Web</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/80 backdrop-blur-xl border border-gray-100 p-8 rounded-3xl hover:border-vuelo-blue/50 transition-all duration-500 group shadow-sm"
  >
    <div className="w-14 h-14 bg-vuelo-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-vuelo-blue/20 transition-all duration-500">
      <Icon className="text-vuelo-blue w-7 h-7" />
    </div>
    <h3 className="text-xl font-display font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", description: "", buttonText: "Entendido", buttonLink: "" });

  const openModal = (title: string, description: string, buttonText: string = "Entendido", buttonLink: string = "") => {
    setModalContent({ title, description, buttonText, buttonLink });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-vuelo-blue selection:text-white overflow-x-hidden">
      <VideoBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-vuelo-blue/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-vuelo-indigo/20 blur-[120px] rounded-full animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-8 text-sm font-medium text-vuelo-blue border border-gray-200">
              <Send className="w-4 h-4 fill-[#0056d2] text-[#0056d2] stroke-[#ff8c00] stroke-[2px] -rotate-12" />
              <span>Presentamos Vuelo Email v1.0</span>
            </div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1] text-gray-900"
          >
            Siente el <span className="text-gradient">Vuelo</span> <br />
            En Tu Bandeja
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            El cliente de correo y mensajería más rápido y ligero diseñado específicamente para el ecosistema Vuelo. 
            Simple, seguro y construido para la velocidad.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="https://play.google.com/store/apps/details?id=dev.josegaldamez.vueloemail" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-vuelo-blue text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-vuelo-blue/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-vuelo-blue/20 flex items-center justify-center gap-2 group"
            >
              Empezar Ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/login" className="w-full sm:w-auto bg-white border border-gray-200 text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
              Iniciar Sesión Web
            </Link>
          </motion.div>

          {/* Abstract Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-24 relative"
          >
            <div className="glass rounded-[2rem] p-2 md:p-4 max-w-4xl mx-auto shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-vuelo-blue/5 to-vuelo-indigo/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Mock UI - Inspired by Screenshot */}
              <div className="flex bg-white rounded-[1.5rem] overflow-hidden h-[500px] md:h-[600px] shadow-inner">
                {/* App Sidebar (from screenshot) */}
                <div className="w-64 md:w-72 bg-[#f4f7f9] border-r border-gray-100 flex flex-col text-left">
                  {/* Blue Header Section */}
                  <div className="bg-[#0056d2] p-8 text-white">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                      <div className="w-16 h-16 bg-[#0056d2] rounded-full flex items-center justify-center overflow-hidden">
                        <User className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-1">Cuenta Activa</h4>
                    <p className="text-sm opacity-90 truncate font-medium">mperdom1@vuelo.email</p>
                  </div>

                  {/* Status Line */}
                  <div className="px-8 py-4 border-b border-gray-200 flex items-center gap-3 bg-white/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-400 shadow-sm" />
                    <span className="text-sm text-gray-400 font-semibold tracking-tight">Mensajería desconectada</span>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 py-2 bg-white">
                    <div className="px-8 py-5 flex items-center gap-5 text-[#1a1a1a] bg-[#f0f7ff] border-r-[6px] border-[#0056d2]">
                      <Square className="w-7 h-7 text-[#1a1a1a]" />
                      <span className="font-bold text-lg">Bandeja de Entrada</span>
                    </div>
                    <div className="px-8 py-5 flex items-center gap-5 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <Send className="w-7 h-7 group-hover:text-[#0056d2] transition-colors" />
                      <span className="font-bold text-lg">Enviados</span>
                    </div>
                    <div className="px-8 py-5 flex items-center gap-5 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <MessageSquare className="w-7 h-7 group-hover:text-[#0056d2] transition-colors" />
                      <span className="font-bold text-lg">Instantáneo</span>
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="p-8 border-t border-gray-100 flex items-center gap-5 text-[#ff4d4d] font-bold text-lg cursor-pointer hover:bg-red-50 transition-colors bg-white">
                    <LogOut className="w-7 h-7" />
                    <span>Cerrar Sesión</span>
                  </div>
                </div>
                
                {/* Main Content Area (Mock) */}
                <div className="flex-1 bg-gray-50 p-6 flex flex-col gap-6 relative">
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-gray-200 rounded-full" />
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                          <div className="h-2 w-full bg-gray-100 rounded" />
                        </div>
                        <div className="h-2 w-8 bg-gray-100 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Floating Action Button */}
                  <div className="absolute bottom-8 right-8 w-14 h-14 bg-[#0a192f] rounded-2xl flex items-center justify-center shadow-xl text-white cursor-pointer hover:scale-110 transition-transform">
                    <span className="text-3xl font-light">+</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Orbs */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-vuelo-blue blur-3xl opacity-30" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-vuelo-indigo blur-3xl opacity-30" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-gray-900">Construido para la <span className="text-vuelo-blue">Web Moderna</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Vuelo Email combina la fiabilidad de los protocolos tradicionales con la velocidad de la mensajería moderna en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Send} 
              title="Entrega Instantánea" 
              description="Mensajes y correos entregados en milisegundos gracias a nuestra infraestructura en GCP y backend en Golang."
              delay={0.1}
            />
            <FeatureCard 
              icon={Lock} 
              title="Privacidad de Extremo a Extremo" 
              description="Tus datos permanecen en tu servidor Ubuntu 24.04 LTS. Nosotros nunca vemos tus mensajes, y nadie más tampoco."
              delay={0.2}
            />
            <FeatureCard 
              icon={Layers} 
              title="Integración Profunda" 
              description="Conéctate sin problemas con Postfix, Dovecot y Openfire para una experiencia de comunicación unificada."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <AppShowcase />

      {/* Integration Section */}
      <section id="integration" className="py-24 md:py-40 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight text-gray-900">
                Un Servidor. <br />
                <span className="text-vuelo-blue">Infinitas</span> Conexiones.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Vuelo Email no es solo otro cliente. Es una puerta de enlace especializada a tu servidor Vuelo, 
                manejando tanto el correo tradicional como la mensajería instantánea moderna en una sola interfaz ligera.
              </p>
              <ul className="space-y-4">
                {[
                  "Servidor Ubuntu 24.04 LTS en GCP",
                  "Postfix y Dovecot (SMTP/IMAP)",
                  "Openfire para mensajería instantánea",
                  "Backend en Golang y App en Flutter"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-vuelo-blue/20 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-vuelo-blue" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="flex-1 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="glass p-12 rounded-[3rem] aspect-square flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-vuelo-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-bounce duration-[3000ms]">
                    <Cloud className="w-16 h-16 text-vuelo-blue" />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-vuelo-blue rounded-2xl flex items-center justify-center shadow-lg shadow-vuelo-blue/30">
                      <Mail className="text-white w-8 h-8" />
                    </div>
                    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center">
                      <MessageSquare className="text-white/60 w-8 h-8" />
                    </div>
                  </div>
                </div>
                
                {/* Orbiting Elements */}
                <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute top-1/2 left-0 w-4 h-4 bg-vuelo-blue rounded-full blur-sm" />
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-vuelo-indigo rounded-full blur-sm" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-vuelo-dark rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-vuelo-blue/10 to-vuelo-indigo/10 -z-10" />
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">¿Listo para <span className="text-vuelo-blue">volar</span>?</h2>
            <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">
              Únete a miles de usuarios que ya se han cambiado a la experiencia de correo más rápida en el servidor Vuelo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://play.google.com/store/apps/details?id=dev.josegaldamez.vueloemail" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-vuelo-dark px-12 py-5 rounded-2xl font-bold text-xl hover:bg-vuelo-blue hover:text-white transition-all duration-300 shadow-2xl text-center"
              >
                Empezar Ahora
              </a>
              <button 
                onClick={() => openModal(
                  "Ventas", 
                  "Nuestro equipo de ventas se pondrá en contacto contigo pronto para discutir soluciones personalizadas para tu empresa.",
                  "Contactar por Correo",
                  "mailto:contacto@josegaldamez.dev"
                )}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/10 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300"
              >
                Contactar Ventas
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Send className="text-[#0056d2] w-7 h-7 -rotate-12 fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px]" />
                </div>
                <span className="text-xl font-display font-bold tracking-tight text-gray-900">Vuelo<span className="text-vuelo-blue">Email</span></span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Reimaginando la comunicación para el ecosistema Vuelo. Rápido, seguro y abierto.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-gray-900">Producto</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#features" className="hover:text-vuelo-blue transition-colors">Características</a></li>
                <li><button onClick={() => openModal("Integraciones", "Vuelo Email se integra con Slack, Discord y Microsoft Teams. Próximamente más integraciones.")} className="hover:text-vuelo-blue transition-colors text-left">Integraciones</button></li>
                <li><button onClick={() => openModal("Empresas", "Soluciones robustas para empresas de todos los tamaños. Gestión de equipos y dominios personalizados.")} className="hover:text-vuelo-blue transition-colors text-left">Empresas</button></li>
                <li><button onClick={() => openModal("Soluciones", "Desde freelancers hasta grandes corporaciones, tenemos una solución para cada necesidad de comunicación.")} className="hover:text-vuelo-blue transition-colors text-left">Soluciones</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-gray-900">Recursos</h4>
              <ul className="space-y-4 text-gray-500">
                <li><Link to="/info" className="hover:text-vuelo-blue transition-colors text-left">Ficha Técnica</Link></li>
                <li><Link to="/info" className="hover:text-vuelo-blue transition-colors text-left">Manual de Usuario</Link></li>
                <li><Link to="/info" className="hover:text-vuelo-blue transition-colors text-left">Capacitación (WBT)</Link></li>
                <li><Link to="/marketing" className="hover:text-vuelo-blue transition-colors text-left">Kit de Marca & Impresión</Link></li>
                <li><button onClick={() => openModal("Estado", "Todos los sistemas operativos. Latencia actual: 45ms.")} className="hover:text-vuelo-blue transition-colors text-left">Estado</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-gray-900">Compañía</h4>
              <ul className="space-y-4 text-gray-500">
                <li><Link to="/about" className="hover:text-vuelo-blue transition-colors">Sobre Nosotros</Link></li>
                <li><button onClick={() => openModal("Carreras", "Estamos buscando talento apasionado por la comunicación abierta. ¡Únete a nuestro equipo!")} className="hover:text-vuelo-blue transition-colors text-left">Carreras</button></li>
                <li><button onClick={() => openModal("Privacidad", "Tu privacidad es nuestra prioridad. No rastreamos tus datos ni vendemos tu información.")} className="hover:text-vuelo-blue transition-colors text-left">Privacidad</button></li>
                <li><button onClick={() => openModal("Términos", "Al usar Vuelo Email, aceptas nuestros términos de servicio diseñados para proteger a la comunidad.")} className="hover:text-vuelo-blue transition-colors text-left">Términos</button></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-100 gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm mb-1">
                © 2026 Vuelo Email. Todos los derechos reservados.
              </p>
              <p className="text-gray-300 text-[10px] font-mono uppercase tracking-widest">
                Desarrollado por: Jose Daniel Fernandez, Esdras Josue Moreno, Jose Galdamez, Michelle Perdomo
              </p>
            </div>
            <div className="flex gap-8 text-gray-400">
              <Globe className="w-5 h-5 hover:text-vuelo-blue transition-colors cursor-pointer" />
              <MessageSquare className="w-5 h-5 hover:text-vuelo-blue transition-colors cursor-pointer" />
              <Send className="w-5 h-5 hover:text-vuelo-blue transition-colors cursor-pointer fill-[#0056d2] text-[#0056d2] stroke-[#ff8c00] stroke-[1.5px]" />
            </div>
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-vuelo-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                <Send className="text-[#0056d2] w-10 h-10 -rotate-12 fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px]" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">{modalContent.title}</h3>
              <p className="text-white/60 leading-relaxed mb-8">
                {modalContent.description}
              </p>
              {modalContent.buttonLink ? (
                <div className="flex flex-col gap-3">
                  <a 
                    href={modalContent.buttonLink}
                    className="w-full bg-vuelo-blue text-white py-4 rounded-xl font-bold hover:bg-vuelo-blue/90 transition-all text-center"
                  >
                    {modalContent.buttonText}
                  </a>
                  <a 
                    href="https://josegaldamez.dev/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white/10 text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all text-center border border-white/10"
                  >
                    Visitar Web Desarrollador
                  </a>
                </div>
              ) : (
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-vuelo-blue text-white py-4 rounded-xl font-bold hover:bg-vuelo-blue/90 transition-all"
                >
                  {modalContent.buttonText}
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AppShowcase() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vuelo-blue/10 text-vuelo-blue text-sm font-bold mb-6"
          >
            <Smartphone className="w-4 h-4" />
            Interfaz Moderna
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900">
            Diseñada para la <span className="text-vuelo-blue">velocidad</span>
          </h2>
          <p className="text-xl text-gray-600">
            Una experiencia de usuario fluida y minimalista, optimizada para que gestiones tus correos en segundos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Login Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-b from-vuelo-blue/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#1a5fb4] rounded-[3rem] p-3 shadow-2xl border-[8px] border-[#0d1b2a]">
              <div className="bg-[#f4f7f9] rounded-[2.2rem] overflow-hidden aspect-[9/19] flex flex-col">
                <div className="px-6 pt-4 flex justify-between items-center text-gray-400 text-[10px] font-bold">
                  <span>2:48</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-3 h-3 border border-gray-400 rounded-sm" />
                    <div className="w-3 h-3 border border-gray-400 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
                  <Send className="w-12 h-12 text-[#0056d2] fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px] mb-4 -rotate-12" />
                  <h3 className="text-xl font-bold text-[#1a1c1e] mb-1">Iniciar Sesión</h3>
                  <p className="text-[10px] text-gray-400 mb-6 text-center">Bienvenido a Vuelo Email</p>
                  <div className="w-full space-y-2">
                    <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
                      <AtSign className="w-4 h-4 text-gray-300" />
                      <div className="h-2 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
                      <Lock className="w-4 h-4 text-gray-300" />
                      <div className="h-2 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="bg-[#0d1b2a] text-white py-3 rounded-xl text-[10px] font-bold text-center mt-4">
                      Iniciar Sesión
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center mt-6 font-bold text-gray-900">Acceso Rápido</p>
          </motion.div>

          {/* Sidebar Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative group md:-translate-y-8"
          >
            <div className="absolute -inset-4 bg-gradient-to-b from-vuelo-indigo/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#1a5fb4] rounded-[3rem] p-3 shadow-2xl border-[8px] border-[#0d1b2a]">
              <div className="bg-[#1a1c1e] rounded-[2.2rem] overflow-hidden aspect-[9/19] flex flex-col relative">
                {/* Drawer Sidebar */}
                <div className="absolute inset-y-0 left-0 w-[85%] bg-[#f4f7f9] flex flex-col z-10 shadow-2xl">
                  <div className="bg-[#0056d2] p-6 pt-10 text-white relative">
                    <div className="absolute top-2 left-4 text-[10px] font-bold opacity-80">2:48</div>
                    <div className="absolute top-2 right-4 flex gap-1 opacity-80">
                      <div className="w-2.5 h-2.5 border border-white rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                      <User className="w-6 h-6 text-[#0056d2]" />
                    </div>
                    <h4 className="text-sm font-bold">Cuenta Activa</h4>
                    <p className="text-[10px] opacity-80">maria@vuelo.email</p>
                  </div>
                  
                  <div className="px-6 py-2 border-b border-gray-100 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <span className="text-[9px] text-gray-400 font-medium">Mensajería desconectada</span>
                  </div>

                  <div className="flex-1 py-4">
                    <div className="px-6 py-3 flex items-center gap-4 text-[#1a1a1a] bg-blue-50/50">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-xs">Bandeja de Entrada</span>
                    </div>
                    <div className="px-6 py-3 flex items-center gap-4 text-gray-500">
                      <Send className="w-5 h-5" />
                      <span className="font-medium text-xs">Enviados</span>
                    </div>
                    <div className="px-6 py-3 flex items-center gap-4 text-gray-500">
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-medium text-xs">Instantáneo</span>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-gray-100">
                      <div className="px-6 py-3 flex items-center gap-4 text-red-500">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-xs">Cerrar Sesión</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Content (Dimmed) */}
                <div className="flex-1 bg-gray-400/20 flex items-center justify-center p-4">
                  <div className="text-[10px] text-gray-500 italic">Cargando mensajería...</div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-6 right-4 w-10 h-10 bg-[#0d1b2a] rounded-xl flex items-center justify-center shadow-lg z-20">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            <p className="text-center mt-6 font-bold text-gray-900">Navegación Intuitiva</p>
          </motion.div>

          {/* Signup Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-b from-vuelo-blue/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#1a5fb4] rounded-[3rem] p-3 shadow-2xl border-[8px] border-[#0d1b2a]">
              <div className="bg-[#f4f7f9] rounded-[2.2rem] overflow-hidden aspect-[9/19] flex flex-col">
                <div className="px-6 pt-4 flex justify-between items-center text-gray-400 text-[10px] font-bold">
                  <span>2:49</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-3 h-3 border border-gray-400 rounded-sm" />
                    <div className="w-3 h-3 border border-gray-400 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
                  <div className="relative mb-4">
                    <Send className="w-12 h-12 text-[#0056d2] fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px] -rotate-12" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-[#f4f7f9]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1c1e] mb-1">Crear Cuenta</h3>
                  <p className="text-[10px] text-gray-400 mb-6 text-center">Únete a Vuelo Email</p>
                  <div className="w-full space-y-2">
                    <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
                      <AtSign className="w-4 h-4 text-gray-300" />
                      <div className="h-2 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
                      <Lock className="w-4 h-4 text-gray-300" />
                      <div className="h-2 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="bg-[#0d1b2a] text-white py-3 rounded-xl text-[10px] font-bold text-center mt-4">
                      Crear Cuenta
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center mt-6 font-bold text-gray-900">Registro Simple</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
