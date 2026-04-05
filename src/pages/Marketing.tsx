import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";
import { 
  Download, 
  Image as ImageIcon, 
  Type, 
  Palette, 
  Maximize, 
  Smartphone, 
  Monitor, 
  QrCode as QrIcon,
  ArrowLeft,
  Printer,
  Layers,
  CheckCircle2,
  X,
  Send,
  FileDown,
  Instagram,
  Facebook,
  Twitter,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { VideoBackground } from "../components/VideoBackground";

const AssetCard = ({ title, description, children, size }: { title: string, description: string, children: React.ReactNode, size?: string }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setIsDownloading(true);
    
    try {
      // Pequeña espera para asegurar que los estilos estén aplicados
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Capturar el elemento real del DOM como PNG
      const dataUrl = await toPng(contentRef.current, {
        quality: 1.0,
        pixelRatio: 3, // Alta calidad para impresión
        backgroundColor: '#ffffff',
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${title.toLowerCase().replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Capture failed:", error);
      alert("Error al generar la imagen. Por favor intenta de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl overflow-hidden group hover:border-vuelo-blue/50 transition-all shadow-sm"
    >
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        {size && <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{size}</span>}
      </div>
      <div className="p-8 flex items-center justify-center bg-gray-50 min-h-[300px] relative overflow-hidden">
        <div ref={contentRef} className="bg-white p-4 rounded-lg shadow-sm">
          {children}
        </div>
      </div>
      <div className="p-4 bg-gray-50/50 flex justify-end gap-3">
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-all ${
            isDownloading ? 'bg-gray-400 cursor-wait' : 'bg-vuelo-blue hover:bg-vuelo-blue/80'
          } text-white`}
        >
          {isDownloading ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Procesando...</>
          ) : (
            <><Download className="w-3.5 h-3.5" /> Descargar Diseño</>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default function Marketing() {
  // CONFIGURACIÓN: Link real de la app en Play Store
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=dev.josegaldamez.vueloemail";

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-vuelo-blue selection:text-white">
      <VideoBackground />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-vuelo-blue transition-colors">
              <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-white" />
            </div>
            <span className="font-semibold tracking-tight text-gray-900">Volver al Inicio</span>
          </Link>
          <div className="flex items-center gap-3">
            <Printer className="w-5 h-5 text-vuelo-blue" />
            <h1 className="text-xl font-bold text-gray-900">
              Kit de Marca & Impresión
            </h1>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Intro */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vuelo-blue/10 border border-vuelo-blue/20 text-vuelo-blue text-xs font-medium mb-6"
          >
            <Layers className="w-3 h-3" /> RECURSOS PARA FERIA DE PROYECTOS
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
            Todo lo que necesitas para <span className="text-vuelo-blue">hacer brillar</span> a Vuelo.
          </h2>
          <p className="text-gray-600 text-lg">
            Descarga banners de alta resolución, logotipos vectoriales y capturas de pantalla optimizadas para impresión en gran formato.
          </p>
        </section>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Banner Principal */}
          <AssetCard 
            title="Banner de Stand (Vertical)" 
            description="Diseño oficial para roll-up o banner vertical."
            size="55 x 152 cm"
          >
            <div className="w-[240px] aspect-[55/152] rounded-lg overflow-hidden relative shadow-2xl group bg-vuelo-blue">
              {/* Geometric Figures Background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[30%] bg-white/5 rounded-full blur-2xl" />
                <div className="absolute top-[20%] right-[-20%] w-[80%] h-[20%] bg-white/10 rotate-45 transform" />
                <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] border border-white/20 rounded-full" />
                <div className="absolute top-[40%] left-[20%] w-4 h-4 bg-white/40 rounded-full" />
                <div className="absolute top-[60%] right-[15%] w-8 h-8 border-2 border-white/30 rotate-12" />
              </div>

              <div className="absolute inset-0 p-6 flex flex-col items-center justify-between text-center">
                <div className="flex flex-col items-center gap-4 mt-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                    <Send className="w-12 h-12 text-[#0056d2] fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px] -rotate-12" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-white leading-none tracking-tighter uppercase">VUELO</h4>
                    <p className="text-white/80 text-[10px] font-medium tracking-[0.3em] uppercase mt-2">Email & Chat</p>
                  </div>
                </div>

                <div className="space-y-4 mb-16">
                  <p className="text-xl font-bold text-white leading-tight">
                    La comunicación <br />
                    <span className="text-white/60">del futuro,</span> <br />
                    diseñada para hoy.
                  </p>
                  <div className="w-10 h-1 bg-white/30 mx-auto rounded-full" />
                </div>

                <div className="w-20 h-20 bg-white p-2 rounded-xl shadow-xl flex items-center justify-center">
                  <QRCode value={PLAY_STORE_URL} size={64} />
                </div>
              </div>
            </div>
          </AssetCard>

          {/* Banner Vertical / Roll-up */}
          <AssetCard 
            title="Banner de Mesa / Stand" 
            description="Versión compacta para superficies reducidas."
            size="55 x 152 cm"
          >
            <div className="w-[240px] aspect-[55/152] rounded-lg overflow-hidden relative shadow-2xl group bg-white border border-gray-100">
              {/* Geometric Figures Background - Light Version */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[10%] right-[-10%] w-[70%] h-[30%] bg-vuelo-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[20%] left-[-20%] w-[60%] h-[40%] bg-vuelo-blue/10 rounded-full blur-2xl" />
                <div className="absolute top-[30%] left-[-10%] w-[50%] h-[2px] bg-vuelo-blue/20 -rotate-45 transform" />
                <div className="absolute bottom-[40%] right-[-10%] w-[50%] h-[2px] bg-vuelo-blue/20 -rotate-45 transform" />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-vuelo-blue/5 rounded-full" />
              </div>

              <div className="absolute inset-0 p-6 flex flex-col items-center justify-between text-center">
                <div className="flex flex-col items-center gap-2 mt-8">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Send className="w-9 h-9 text-[#0056d2] fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px] -rotate-12" />
                  </div>
                  <h4 className="text-xl font-black text-vuelo-blue tracking-tighter uppercase">VUELO</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="text-lg font-bold text-gray-900 leading-tight">
                    Seguridad.<br/>
                    Velocidad.<br/>
                    <span className="text-vuelo-blue">Simplicidad.</span>
                  </div>
                  <div className="w-10 h-1 bg-vuelo-blue/20 mx-auto rounded-full" />
                </div>

                <div className="mb-12">
                  <div className="w-16 h-16 bg-white p-1 rounded-lg mx-auto shadow-md border border-gray-100 flex items-center justify-center">
                    <QRCode value={PLAY_STORE_URL} size={56} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 font-medium tracking-widest uppercase">Escanea para descargar</p>
                </div>
              </div>
            </div>
          </AssetCard>

          {/* Logo Variations */}
          <AssetCard 
            title="Variaciones de Logotipo" 
            description="Versiones en positivo, negativo y monocromo."
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                  <Send className="w-14 h-14 text-[#0056d2] fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px] -rotate-12" />
                </div>
                <span className="text-[10px] text-gray-500">Principal</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-[#0056d2] rounded-2xl flex items-center justify-center shadow-xl">
                  <Send className="w-14 h-14 text-white fill-white stroke-[#ff8c00] stroke-[1.5px] -rotate-12" />
                </div>
                <span className="text-[10px] text-gray-500">Inverso</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center border border-white/10">
                  <Send className="w-14 h-14 text-white fill-white stroke-[#ff8c00] stroke-[1.5px] -rotate-12" />
                </div>
                <span className="text-[10px] text-gray-500">Dark Mode</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <Send className="w-14 h-14 text-gray-400 fill-gray-400 stroke-gray-500 stroke-[1.5px] -rotate-12" />
                </div>
                <span className="text-[10px] text-gray-500">Monocromo</span>
              </div>
            </div>
          </AssetCard>
        </div>

        {/* Social Media Campaign Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-vuelo-blue/10 rounded-xl flex items-center justify-center">
              <Smartphone className="text-vuelo-blue w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">Campaña en Redes Sociales</h2>
              <p className="text-gray-500">Recursos optimizados para Instagram, Facebook y X.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AssetCard 
              title="Instagram Post" 
              description="Diseño cuadrado para el feed principal."
              size="1080x1080"
            >
              <div className="w-48 h-48 bg-vuelo-blue rounded-2xl flex flex-col items-center justify-center p-6 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                <Send className="w-16 h-16 mb-4 fill-white stroke-[#ff8c00] stroke-[1.5px] -rotate-12" />
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Vuelo Email</p>
                <p className="text-xs font-medium text-center mt-2">La red de comunicación más rápida.</p>
                <div className="mt-4 flex items-center justify-between w-full">
                  <div className="flex gap-1">
                    <Instagram className="w-3 h-3 opacity-50" />
                    <Facebook className="w-3 h-3 opacity-50" />
                  </div>
                  <div className="bg-white p-1 rounded-sm shadow-sm">
                    <QRCode value={PLAY_STORE_URL} size={24} />
                  </div>
                </div>
              </div>
            </AssetCard>

            <AssetCard 
              title="Instagram Story" 
              description="Imagen vertical para historias."
              size="1080x1920"
            >
              <div className="w-32 h-56 bg-vuelo-dark rounded-[2rem] border-4 border-gray-800 overflow-hidden relative shadow-2xl group">
                {/* Animated Background */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-br from-vuelo-blue/20 via-vuelo-indigo/20 to-vuelo-dark opacity-50"
                />
                
                {/* Logo and Slogan Animation */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-3"
                  >
                    <Send className="w-10 h-10 text-white fill-white stroke-[#ff8c00] stroke-[1.5px] -rotate-12 drop-shadow-lg" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-[10px] font-black text-white tracking-tighter mb-1 uppercase">Vuelo Email</h4>
                    <p className="text-[6px] text-vuelo-blue font-bold uppercase tracking-widest leading-tight">
                      La comunicación <br /> del futuro
                    </p>
                  </motion.div>

                  {/* Progress Bar */}
                  <div className="mt-auto mb-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full bg-vuelo-blue shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />
                  </div>
                </div>
              </div>
            </AssetCard>

            <AssetCard 
              title="X / Twitter Post" 
              description="Banner horizontal para anuncios y posts."
              size="1200x675"
            >
              <div className="w-64 h-36 bg-gradient-to-r from-vuelo-blue to-vuelo-indigo rounded-xl flex items-center justify-between p-6 text-white shadow-lg overflow-hidden relative">
                <div className="relative z-10">
                  <Send className="w-8 h-8 mb-2 fill-white stroke-[#ff8c00] stroke-[1.5px] -rotate-12" />
                  <p className="text-[10px] font-bold">VUELO EMAIL</p>
                  <p className="text-[8px] opacity-70">vuelo.email/signup</p>
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-full blur-2xl absolute -right-10 -bottom-10" />
                <Twitter className="w-4 h-4 opacity-40 relative z-10" />
              </div>
            </AssetCard>
          </div>
        </div>

        {/* Style Guide Section */}
        <section className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-vuelo-blue" />
                <h3 className="text-2xl font-bold text-gray-900">Guía de Estilo</h3>
              </div>
              <p className="text-gray-600 mb-8">
                Usa estos colores y tipografías para mantener la consistencia visual en tus propios diseños.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">Colores Principales</h4>
                  <div className="flex gap-4">
                    {[
                      { name: 'Vuelo Blue', hex: '#3B82F6', class: 'bg-vuelo-blue' },
                      { name: 'Deep Dark', hex: '#0A0A0B', class: 'bg-vuelo-dark border border-gray-800' },
                      { name: 'Accent', hex: '#6366F1', class: 'bg-indigo-500' },
                    ].map(color => (
                      <div key={color.name} className="flex flex-col gap-2">
                        <div className={`w-16 h-16 rounded-xl ${color.class}`} />
                        <div className="text-center">
                          <p className="text-[10px] font-bold text-gray-900">{color.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono">{color.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">Tipografía</h4>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <span className="text-3xl font-bold text-gray-900">Inter</span>
                      <span className="text-gray-500 text-sm">Sans-serif (UI & Títulos)</span>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-xl font-mono text-vuelo-blue">JetBrains Mono</span>
                      <span className="text-gray-500 text-sm">Monospace (Datos Técnicos)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900">Consejos de Impresión</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Para banners grandes, pide impresión en Lona Frontlit de 510g.",
                  "Asegúrate de que el perfil de color sea CMYK para evitar variaciones.",
                  "Los archivos descargados están a 300 DPI para máxima nitidez.",
                  "El código QR ya apunta a tu link real de la Play Store.",
                  "El Roll-up se ve mejor con acabado mate para evitar reflejos de luces."
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600">
                    <span className="text-vuelo-blue font-bold">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm">
          &copy; 2026 Vuelo Email Project. Todos los recursos están bajo licencia MIT para fines académicos.
        </p>
      </footer>
    </div>
  );
}
