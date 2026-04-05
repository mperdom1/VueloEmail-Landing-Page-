import { motion } from "motion/react";
import { Send, Users, Code, Target, GraduationCap, Briefcase, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoBackground } from "../components/VideoBackground";

const TeamMember = ({ name, delay }: { name: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/80 backdrop-blur-xl border border-gray-100 p-6 rounded-3xl text-center group hover:border-vuelo-blue/50 transition-all duration-500 shadow-sm"
  >
    <div className="w-20 h-20 bg-vuelo-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
      <div className="w-16 h-16 bg-gradient-to-br from-vuelo-blue to-vuelo-indigo rounded-full flex items-center justify-center text-white font-bold text-xl">
        {name[0]}
      </div>
    </div>
    <h4 className="text-lg font-display font-bold mb-1 text-gray-900">{name}</h4>
  </motion.div>
);

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden selection:bg-vuelo-blue selection:text-white">
      <VideoBackground />
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-vuelo-blue/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-vuelo-indigo/5 blur-[120px] rounded-full" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Send className="text-[#0056d2] w-7 h-7 -rotate-12 fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px]" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-gray-900">Vuelo<span className="text-vuelo-blue">Email</span></span>
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-vuelo-blue transition-colors flex items-center gap-2 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-6 text-sm font-medium text-vuelo-blue border border-gray-200">
              <GraduationCap className="w-4 h-4" />
              <span>Proyecto de Sistemas Operativos</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight text-gray-900">
              Nuestra <span className="text-gradient">Historia</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Hemos creado y configurado un servidor de correos y mensajería integral, junto con una aplicación móvil en Flutter que permite interactuar con él de forma fluida y segura.
            </p>
          </motion.div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl border border-gray-100 p-10 rounded-[2.5rem] shadow-sm"
            >
              <div className="w-12 h-12 bg-vuelo-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="text-vuelo-blue w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">Para Emprendedores</h3>
              <p className="text-gray-600 leading-relaxed">
                Entendemos que las pequeñas empresas tienen presupuestos limitados. Vuelo Email ofrece una solución profesional de correo y mensajería sin los costos exorbitantes de las grandes corporaciones.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl border border-gray-100 p-10 rounded-[2.5rem] shadow-sm"
            >
              <div className="w-12 h-12 bg-vuelo-indigo/10 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="text-vuelo-indigo w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">Para Estudiantes</h3>
              <p className="text-gray-600 leading-relaxed">
                Como estudiantes, sabemos lo importante que es tener herramientas eficientes. Nuestra plataforma está diseñada para ser intuitiva y ligera, ideal para entornos académicos dinámicos.
              </p>
            </motion.div>
          </div>

          {/* Team Section */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4 text-gray-900">El Equipo de Desarrollo</h2>
              <p className="text-gray-500">Los cerebros detrás del código de Vuelo Email.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <TeamMember name="Jose Daniel Fernandez" delay={0.1} />
              <TeamMember name="Esdras Josue Moreno" delay={0.2} />
              <TeamMember name="Jose Galdamez" delay={0.3} />
              <TeamMember name="Michelle Perdomo" delay={0.4} />
            </div>
          </div>

          {/* Values Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-12 text-center relative overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-vuelo-blue/5 to-vuelo-indigo/5 -z-10" />
            <div className="w-16 h-16 bg-vuelo-blue/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Target className="text-vuelo-blue w-8 h-8" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Nuestra Visión</h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              "Simplificar la comunicación digital mediante el uso eficiente de recursos del sistema, permitiendo que cualquier persona, sin importar su presupuesto, tenga acceso a una plataforma de mensajería de clase mundial."
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm">
          © 2026 Vuelo Email. Creado con ❤️ por estudiantes de Sistemas Operativos.
        </p>
      </footer>
    </div>
  );
}
