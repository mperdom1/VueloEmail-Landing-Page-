import { motion, AnimatePresence } from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { 
  BookOpen, 
  Cpu, 
  Users, 
  Calendar, 
  PlayCircle, 
  CheckCircle2, 
  ArrowLeft,
  Terminal,
  Database,
  Layout,
  Smartphone,
  Mail,
  MessageSquare,
  ChevronRight,
  Send,
  Sparkles,
  Cloud,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { VideoBackground } from "../components/VideoBackground";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-3-flash-preview";

const Section = ({ title, icon: Icon, children, delay = 0 }: { title: string, icon: any, children: React.ReactNode, delay?: number }) => (
  <div className="bg-white/80 backdrop-blur-xl p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-gray-100 mb-6 md:mb-8 shadow-sm">
    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-vuelo-blue/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
        <Icon className="text-vuelo-blue w-5 h-5 md:w-6 md:h-6" />
      </div>
      <h2 className="text-xl md:text-2xl font-display font-bold leading-tight text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

export default function Info() {
  const [activeStep, setActiveStep] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hola, soy el Asistente Técnico de Vuelo. Estoy aquí para ayudarte con cualquier duda sobre el funcionamiento de la app, errores comunes o detalles de nuestra arquitectura (XMPP, Flutter, SQFlite). ¿En qué puedo apoyarte hoy?" }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<{ [key: number]: string | null }>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleAiChat = async (customMsg?: string) => {
    const msgToSend = customMsg || chatInput;
    if (!msgToSend.trim() || isAiLoading) return;
    
    setChatInput("");
    setChatHistory(prev => [...prev, { role: 'user', text: msgToSend }]);
    setIsAiLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: msgToSend,
        config: {
          systemInstruction: `Eres el Asistente Técnico Senior del proyecto Vuelo Email (Aplicación Vuelo). 
          Tu objetivo es ayudar a usuarios y evaluadores de la feria de ingeniería.
          
          CONTEXTO TÉCNICO CLAVE:
          - Servidor: Ubuntu 24.04 LTS en Google Cloud Platform (GCP).
          - Correo: Postfix y Dovecot para orquestar correos electrónicos (SMTP/IMAP) dentro y fuera del servidor.
          - Mensajería Instantánea: Openfire con el plugin Rest API.
          - Seguridad: Let's Encrypt para certificados SSL.
          - Backend: Golang como lenguaje de programación principal del servidor.
          - App Móvil: Flutter para la creación de la aplicación multiplataforma.
          - Funcionalidad: Envío de correos a usuarios externos y mensajería instantánea entre usuarios internos.
          
          TONO: Profesional, servicial, experto en ingeniería de sistemas. 
          Responde siempre en español de forma concisa y técnica.`
        }
      });
      
      setChatHistory(prev => [...prev, { role: 'ai', text: response.text || "Lo siento, tuve un problema procesando esa consulta técnica." }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatHistory(prev => [...prev, { role: 'ai', text: "Error de conexión con el núcleo de IA. Por favor, verifica la configuración." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleQuiz = (stepIndex: number, option: string) => {
    const isCorrect = option === trainingSteps[stepIndex].quiz.answer;
    setQuizFeedback(prev => ({ ...prev, [stepIndex]: isCorrect ? "¡Correcto! 🎯" : "Inténtalo de nuevo 🔄" }));
    
    // Clear feedback after 3 seconds
    setTimeout(() => {
      setQuizFeedback(prev => ({ ...prev, [stepIndex]: null }));
    }, 3000);
  };

  const trainingSteps = [
    {
      title: "Infraestructura Cloud",
      description: "Servidor Ubuntu 24.04 LTS en GCP.",
      icon: Cloud,
      content: "Nuestra plataforma reside en Google Cloud Platform, utilizando una instancia de Ubuntu 24.04 LTS. Esto garantiza una alta disponibilidad y escalabilidad para manejar miles de conexiones simultáneas tanto de correo como de mensajería.",
      quiz: {
        question: "¿Qué sistema operativo utiliza el servidor de Vuelo?",
        options: ["Windows Server", "Ubuntu 24.04 LTS", "CentOS"],
        answer: "Ubuntu 24.04 LTS"
      },
      tip: "GCP nos permite escalar recursos dinámicamente según la demanda del sistema."
    },
    {
      title: "Orquestación de Correo",
      description: "Postfix y Dovecot para SMTP/IMAP.",
      icon: Mail,
      content: "Utilizamos Postfix como Agente de Transferencia de Correo (MTA) y Dovecot como servidor IMAP/POP3. Esta combinación permite que Vuelo envíe y reciba correos electrónicos incluso con usuarios fuera de nuestro servidor.",
      quiz: {
        question: "¿Qué herramienta se encarga de la transferencia de correos (MTA)?",
        options: ["Openfire", "Postfix", "Golang"],
        answer: "Postfix"
      },
      tip: "Dovecot asegura que tus correos estén siempre sincronizados en todos tus dispositivos."
    },
    {
      title: "Mensajería Instantánea",
      description: "Openfire + Rest API Plugin.",
      icon: MessageSquare,
      content: "La mensajería instantánea es gestionada por Openfire, un servidor XMPP robusto. Gracias al plugin Rest API, nuestra aplicación móvil en Flutter puede interactuar de forma eficiente con el servidor de chat.",
      quiz: {
        question: "¿Qué servidor gestiona la mensajería instantánea?",
        options: ["Apache", "Openfire", "Postfix"],
        answer: "Openfire"
      },
      tip: "El protocolo XMPP permite estados de presencia en tiempo real (conectado/ausente)."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-vuelo-blue selection:text-white">
      <VideoBackground />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md py-3 md:py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-vuelo-blue transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600 group-hover:text-white" />
            </div>
            <span className="font-bold text-[10px] md:text-sm whitespace-nowrap text-gray-900">Volver al Inicio</span>
          </Link>
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
              <Send className="text-[#0056d2] w-5 h-5 md:w-7 md:h-7 -rotate-12 fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px]" />
            </div>
            <span className="font-display font-bold text-sm md:text-lg whitespace-nowrap text-gray-900">Recursos</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gray-900">Especificaciones del <span className="text-gradient">Sistema</span></h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Arquitectura técnica y documentación de ingeniería para el ecosistema unificado de Vuelo Email.
          </p>
        </motion.div>

        {/* Ficha Técnica Section */}
        <Section title="Ficha Técnica de Ingeniería" icon={Terminal}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-vuelo-blue text-xs font-bold uppercase tracking-widest mb-2">Arquitectura del Sistema</h4>
                <p className="text-xl font-bold text-gray-900">Aplicación Vuelo (Correo y Mensajería)</p>
                <p className="text-sm text-gray-500 mt-1">Infraestructura de Grado Empresarial</p>
              </div>
              <div>
                <h4 className="text-vuelo-blue text-xs font-bold uppercase tracking-widest mb-2">Desarrollo y Autoría</h4>
                <div className="flex flex-wrap gap-2">
                  {["Jose Daniel Fernandez", "Esdras Josue Moreno", "Jose Galdamez", "Michelle Perdomo"].map(name => (
                    <span key={name} className="px-3 py-1 bg-gray-100 rounded-full text-sm border border-gray-200 text-gray-700">{name}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">Proyecto de Sistemas Operativos - Ingeniería</p>
              </div>
              <div>
                <h4 className="text-vuelo-blue text-xs font-bold uppercase tracking-widest mb-2">Resumen del Proyecto</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hemos creado y configurado un servidor de correos y mensajería y hecho una aplicación móvil que permita interactuar con él. Enviar correos electrónicos incluso a usuarios fuera del servidor y mensajería instantánea entre usuarios.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <h4 className="font-bold mb-4 flex items-center gap-2 text-gray-900">
                <Cpu className="w-4 h-4 text-vuelo-blue" />
                Stack Tecnológico del Ecosistema
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Servidor & Backend</h5>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-vuelo-blue" />
                      Ubuntu 24.04 LTS en Google Cloud Platform.
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-vuelo-blue" />
                      Golang: Lenguaje de programación backend.
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-vuelo-blue" />
                      Postfix & Dovecot: Orquestación de correos.
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Mensajería & Seguridad</h5>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-vuelo-blue" />
                      Openfire: Servidor de mensajería instantánea.
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-vuelo-blue" />
                      Rest API Plugin: Interfaz para Openfire.
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-vuelo-blue" />
                      Let's Encrypt: Certificados SSL/TLS.
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Aplicación Móvil</h5>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-vuelo-blue" />
                      Flutter: Framework de desarrollo multiplataforma.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Glosario de Exposición Section */}
        <Section title="Fundamentos de Ingeniería" icon={Layout} delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                term: "Infraestructura GCP",
                desc: "Uso de Google Cloud Platform para alojar nuestro servidor Ubuntu 24.04 LTS, garantizando estabilidad y conectividad global."
              },
              {
                term: "MTA Postfix",
                desc: "Configuración de Postfix como Agente de Transferencia de Correo para el envío seguro de emails a cualquier dominio externo."
              },
              {
                term: "Servidor Dovecot",
                desc: "Implementación de Dovecot para la gestión de buzones de correo mediante protocolos IMAP y POP3 con seguridad SSL."
              },
              {
                term: "Ecosistema Openfire",
                desc: "Servidor de chat basado en XMPP que permite la comunicación instantánea y persistente entre los usuarios de la red Vuelo."
              },
              {
                term: "Backend en Golang",
                desc: "Uso de Go por su alta eficiencia y concurrencia para manejar las peticiones del servidor y la lógica de negocio."
              },
              {
                term: "Desarrollo en Flutter",
                desc: "Creación de una aplicación móvil única y fluida que integra todas las funciones de comunicación en un solo lugar."
              }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-vuelo-blue/30 transition-colors">
                <h4 className="text-vuelo-blue font-bold text-sm mb-2">{item.term}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* AI Technical Assistant Section */}
        <Section title="Asistente Técnico Inteligente" icon={MessageSquare} delay={0.1}>
          <div className="bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl flex flex-col h-[500px] md:h-[600px]">
            {/* Header / Info */}
            <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Soporte en Tiempo Real</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-vuelo-blue" />
            </div>

            <div className="flex-1 p-4 md:p-6 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 mb-4 pr-2 custom-scrollbar">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] md:max-w-[85%] p-3 md:p-4 rounded-2xl md:rounded-3xl text-xs md:text-sm ${msg.role === 'user' ? 'bg-vuelo-blue text-white rounded-tr-none' : 'bg-gray-100 text-gray-700 border border-gray-200 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-50 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-vuelo-blue rounded-full animate-bounce" />
                        <div className="w-1 h-1 bg-vuelo-blue rounded-full animate-bounce delay-100" />
                        <div className="w-1 h-1 bg-vuelo-blue rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-[10px] md:text-xs text-gray-400 italic">Consultando documentación...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
                {[
                  "¿XMPP?",
                  "¿SQFlite?",
                  "Error conexión",
                  "Flutter"
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleAiChat(suggestion)}
                    disabled={isAiLoading}
                    className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-[9px] md:text-[10px] font-medium text-gray-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
                  placeholder="Duda técnica..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:border-vuelo-blue transition-colors text-gray-900"
                />
                <button 
                  onClick={() => handleAiChat()}
                  disabled={isAiLoading}
                  className="bg-vuelo-blue p-2.5 md:p-3 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 text-white"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Web Based Training (WBT) Section */}
        <Section title="Web Based Training (WBT)" icon={CheckCircle2} delay={0.2}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 space-y-2">
              {trainingSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-3 border ${activeStep === index ? "bg-vuelo-blue text-white border-vuelo-blue shadow-lg shadow-vuelo-blue/20" : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100"}`}
                >
                  <step.icon className={`w-5 h-5 ${activeStep === index ? "text-white" : "text-vuelo-blue"}`} />
                  <span className="font-bold text-sm">{step.title}</span>
                </button>
              ))}
            </div>
            <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-8 border border-gray-100 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-vuelo-blue/5 blur-3xl" />
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative z-10"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">{trainingSteps[activeStep].title}</h3>
                <p className="text-sm md:text-gray-600 mb-6 leading-relaxed">
                  {trainingSteps[activeStep].content}
                </p>
                
                {/* Interactive Quiz Mini-Component */}
                <div className="bg-gray-50 rounded-xl md:rounded-2xl p-5 md:p-6 border border-gray-100 mb-6">
                  <h4 className="text-xs md:text-sm font-bold mb-3 flex items-center gap-2 text-gray-900">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-vuelo-blue" />
                    Mini-Quiz de Repaso
                  </h4>
                  <p className="text-[10px] md:text-xs text-gray-600 mb-4">
                    {trainingSteps[activeStep].quiz.question}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trainingSteps[activeStep].quiz.options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleQuiz(activeStep, opt)}
                        className={`px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs transition-all border ${
                          quizFeedback[activeStep] === "¡Correcto! 🎯" && opt === trainingSteps[activeStep].quiz.answer
                            ? "bg-green-500/20 border-green-500 text-green-600"
                            : "bg-white hover:bg-vuelo-blue/10 border-gray-200 text-gray-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {quizFeedback[activeStep] && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-3 text-[10px] md:text-xs font-bold ${quizFeedback[activeStep]?.includes("Correcto") ? "text-green-600" : "text-red-600"}`}
                      >
                        {quizFeedback[activeStep]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-vuelo-blue/5 rounded-xl md:rounded-2xl border border-vuelo-blue/10">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-vuelo-blue rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <p className="text-[10px] md:text-xs font-medium text-vuelo-blue">Tip: {trainingSteps[activeStep].tip}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">¿Listo para probarlo?</h2>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="bg-vuelo-blue text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl shadow-vuelo-blue/20">
              Crear Cuenta Gratis
            </Link>
            <Link to="/login" className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-colors">
              Acceso Web
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-xs">
          © 2026 Vuelo Email Project - Ingeniería de Sistemas Operativos
        </p>
      </footer>
    </div>
  );
}
