import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Send, 
  MessageSquare, 
  LogOut, 
  Plus, 
  Search, 
  MoreVertical, 
  Star, 
  Trash2, 
  Archive, 
  Settings,
  Bell,
  ChevronLeft,
  Paperclip,
  Smile,
  Image as ImageIcon,
  X,
  SendHorizontal,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { VideoBackground } from "../components/VideoBackground";

const initialEmails = [
  { id: 1, from: "Soporte Vuelo", subject: "Bienvenido a la red", time: "10:24 AM", snippet: "Estamos emocionados de tenerte con nosotros...", body: "Hola mperdom1,\n\nBienvenido a Vuelo Email. Tu cuenta ha sido activada con éxito. Ahora puedes disfrutar de la experiencia de correo más rápida del ecosistema Vuelo.\n\nSi tienes alguna duda, responde a este correo.\n\nSaludos,\nEl equipo de Vuelo.", read: false, starred: false },
  { id: 2, from: "Notificaciones", subject: "Nuevo mensaje instantáneo", time: "09:15 AM", snippet: "Has recibido un nuevo mensaje de Juan Pérez...", body: "Juan Pérez te ha enviado un mensaje instantáneo:\n\n'¿Ya viste la nueva landing page? ¡Se ve increíble!'\n\nVe a la sección de Instantáneo para responder.", read: true, starred: false },
  { id: 3, from: "Seguridad", subject: "Inicio de sesión detectado", time: "Ayer", snippet: "Se ha detectado un nuevo inicio de sesión en tu cuenta...", body: "Alerta de Seguridad:\n\nSe detectó un nuevo inicio de sesión en tu cuenta de Vuelo Email desde un dispositivo desconocido.\n\nUbicación: San Salvador, SV\nDispositivo: Chrome en Windows\n\nSi no fuiste tú, cambia tu contraseña inmediatamente.", read: true, starred: false },
  { id: 4, from: "Vuelo Team", subject: "Actualización de servidor", time: "Ayer", snippet: "El servidor Vuelo se actualizará este fin de semana...", body: "Mantenimiento Programado:\n\nEste sábado a las 02:00 AM UTC, realizaremos una actualización en el servidor principal de Vuelo para mejorar la latencia de la mensajería instantánea.\n\nEl servicio podría estar intermitente por 15 minutos.", read: true, starred: false },
  { id: 5, from: "Marketing", subject: "Nuevas funciones disponibles", time: "28 Mar", snippet: "Descubre las nuevas herramientas de mensajería...", body: "¡Nuevas funciones!\n\nYa puedes adjuntar archivos de hasta 100MB en tus correos de Vuelo. También hemos añadido reacciones con emojis en la mensajería instantánea.\n\n¡Pruébalo ahora!", read: true, starred: false },
];

const initialChats = [
  { id: 1, name: "Juan Pérez", lastMsg: "¡Se ve increíble!", time: "09:15 AM", online: true, messages: [
    { id: 1, text: "Hola, ¿ya viste la nueva landing page?", sender: "them", time: "09:10 AM" },
    { id: 2, text: "¡Se ve increíble!", sender: "them", time: "09:15 AM" }
  ]},
  { id: 2, name: "Maria Garcia", lastMsg: "Gracias por el apoyo", time: "Ayer", online: false, messages: [
    { id: 1, text: "Hola Maria, ¿cómo vas con el proyecto?", sender: "me", time: "Ayer" },
    { id: 2, text: "Gracias por el apoyo, todo va bien.", sender: "them", time: "Ayer" }
  ]},
];

export default function Dashboard() {
  const [view, setView] = useState<'inbox' | 'instant' | 'sent' | 'starred' | 'archived' | 'trash' | 'settings'>('inbox');
  const [emails, setEmails] = useState(initialEmails);
  const [chats, setChats] = useState(initialChats);
  const [selectedEmail, setSelectedEmail] = useState<typeof initialEmails[0] | null>(null);
  const [selectedChat, setSelectedChat] = useState<typeof initialChats[0] | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredEmails = emails.filter(email => {
    if (view === 'inbox') return !email.read || email.read; // Simplified for now, usually inbox is all non-archived
    if (view === 'starred') return email.starred;
    if (view === 'sent') return false; // Mock: we don't have sent emails in initialEmails yet
    return true;
  });

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(emails.map(email => email.id === id ? { ...email, starred: !email.starred } : email));
  };

  const deleteEmail = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(emails.filter(email => email.id !== id));
    if (selectedEmail?.id === id) setSelectedEmail(null);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || !selectedChat) return;
    const newMessage = { id: Date.now(), text: chatInput, sender: "me", time: "Ahora" };
    setChats(chats.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, messages: [...chat.messages, newMessage], lastMsg: chatInput, time: "Ahora" }
        : chat
    ));
    setSelectedChat(prev => prev ? { ...prev, messages: [...prev.messages, newMessage] } : null);
    setChatInput("");
  };

  return (
    <div className="h-screen bg-[#f8f9fa] flex overflow-hidden text-[#1a1a1a] relative selection:bg-vuelo-blue selection:text-white">
      <VideoBackground />
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-gray-100 flex flex-col shadow-xl lg:shadow-sm transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Blue Header Section - Reduced padding */}
        <div className="bg-[#0056d2] p-5 text-white flex items-center justify-between lg:block">
          <div className="flex items-center gap-3 lg:block">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl flex items-center justify-center mb-0 lg:mb-3 shadow-lg shrink-0">
              <Send className="w-8 h-8 lg:w-10 lg:h-10 text-[#0056d2] -rotate-12 fill-[#0056d2] stroke-[#ff8c00] stroke-[1.5px]" />
            </div>
            <div>
              <h4 className="text-sm lg:text-base font-bold">Cuenta Activa</h4>
              <p className="text-[10px] lg:text-xs opacity-90 truncate max-w-[120px] lg:max-w-none">mperdom1@vuelo.email</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Line */}
        <div className="px-5 py-2 border-b border-gray-50 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Mensajería conectada</span>
        </div>

        {/* Menu Items - Reduced padding */}
        <nav className="flex-1 py-2 overflow-y-auto">
          <div 
            onClick={() => { setView('inbox'); setSelectedEmail(null); setIsSidebarOpen(false); }}
            className={`px-5 py-3 flex items-center justify-between cursor-pointer transition-all ${view === 'inbox' ? "text-[#0056d2] bg-blue-50/50 border-r-4 border-[#0056d2]" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span className="font-bold text-sm">Bandeja de Entrada</span>
            </div>
            <span className="bg-[#0056d2] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{emails.length}</span>
          </div>
          <div 
            onClick={() => { setView('sent'); setSelectedEmail(null); setIsSidebarOpen(false); }}
            className={`px-5 py-3 flex items-center gap-3 cursor-pointer transition-all ${view === 'sent' ? "text-[#0056d2] bg-blue-50/50 border-r-4 border-[#0056d2]" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <Send className="w-5 h-5" />
            <span className="font-medium text-sm">Enviados</span>
          </div>
          <div 
            onClick={() => { setView('instant'); setSelectedChat(null); setIsSidebarOpen(false); }}
            className={`px-5 py-3 flex items-center gap-3 cursor-pointer transition-all ${view === 'instant' ? "text-[#0056d2] bg-blue-50/50 border-r-4 border-[#0056d2]" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium text-sm">Instantáneo</span>
          </div>
          
          <div className="mt-6 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Etiquetas</div>
          <div 
            onClick={() => { setView('starred'); setSelectedEmail(null); setIsSidebarOpen(false); }}
            className={`px-5 py-2 flex items-center gap-3 cursor-pointer transition-all ${view === 'starred' ? "text-[#0056d2] bg-blue-50/50 border-r-4 border-[#0056d2]" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Star className={`w-4 h-4 ${view === 'starred' ? "fill-current" : ""}`} />
            <span className="text-xs">Destacados</span>
          </div>
          <div 
            onClick={() => { setView('archived'); setSelectedEmail(null); setIsSidebarOpen(false); }}
            className={`px-5 py-2 flex items-center gap-3 cursor-pointer transition-all ${view === 'archived' ? "text-[#0056d2] bg-blue-50/50 border-r-4 border-[#0056d2]" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Archive className="w-4 h-4" />
            <span className="text-xs">Archivados</span>
          </div>
          <div 
            onClick={() => { setView('trash'); setSelectedEmail(null); setIsSidebarOpen(false); }}
            className={`px-5 py-2 flex items-center gap-3 cursor-pointer transition-all ${view === 'trash' ? "text-[#0056d2] bg-blue-50/50 border-r-4 border-[#0056d2]" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs">Papelera</span>
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-gray-50 space-y-0.5">
          <div 
            onClick={() => setView('settings')}
            className={`px-3 py-2 flex items-center gap-3 rounded-lg transition-colors cursor-pointer ${view === 'settings' ? "text-[#0056d2] bg-blue-50" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs font-medium">Configuración</span>
          </div>
          <Link to="/" className="px-3 py-2 flex items-center gap-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-medium">Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative bg-white/60 backdrop-blur-sm">
        {/* Header - Reduced height */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-2xl">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            {(selectedEmail || selectedChat || view === 'settings') && (
              <button 
                onClick={() => { setSelectedEmail(null); setSelectedChat(null); if(view === 'settings') setView('inbox'); }}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar..."
                className="w-full bg-gray-100 border-none rounded-xl py-2 pl-9 md:pl-10 pr-4 focus:ring-2 focus:ring-blue-100 transition-all text-xs md:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-6">
            <button className="hidden sm:flex w-9 h-9 rounded-full hover:bg-gray-100 items-center justify-center text-gray-500 relative">
              <Bell className="w-4 h-4" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs md:text-sm">
              MP
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {/* Toast Notification */}
          <AnimatePresence>
            {toast && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold flex items-center gap-2 border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                {toast}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {view === 'settings' ? (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="h-full overflow-y-auto p-8 max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-bold mb-8">Configuración</h2>
                
                <div className="space-y-8">
                  <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Perfil</h3>
                    <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">MP</div>
                        <button className="text-sm text-blue-600 font-bold hover:underline">Cambiar foto</button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">Nombre</label>
                          <input type="text" defaultValue="mperdom1" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">Correo</label>
                          <input type="text" defaultValue="mperdom1@vuelo.email" disabled className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Seguridad</h3>
                    <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                      <button className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cambiar contraseña</button>
                      <button className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Autenticación de dos factores</button>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Notificaciones</h3>
                    <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Notificaciones de escritorio</span>
                        <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" /></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sonido de mensaje nuevo</span>
                        <div className="w-10 h-5 bg-gray-300 rounded-full relative"><div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full" /></div>
                      </div>
                    </div>
                  </section>
                </div>
              </motion.div>
            ) : view === 'instant' ? (
              /* Instant Messaging View */
              <motion.div 
                key="instant"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex"
              >
                {/* Chat List */}
                  <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col shrink-0 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 md:p-6 border-b border-gray-100">
                      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Mensajería Instantánea</h2>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Buscar chats..."
                          className="w-full bg-gray-100 border-none rounded-xl py-2 pl-9 pr-4 text-[10px] md:text-xs"
                        />
                      </div>
                    </div>
                  <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => (
                      <div 
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-gray-50 ${selectedChat?.id === chat.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                            {chat.name[0]}
                          </div>
                          {chat.online && (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                            <h4 className="text-xs font-bold truncate">{chat.name}</h4>
                            <span className="text-[9px] text-gray-400">{chat.time}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 truncate">{chat.lastMsg}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Detail */}
                <div className={`flex-1 flex flex-col bg-gray-50/30 ${!selectedChat ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
                  {selectedChat ? (
                    <>
                      <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button onClick={() => setSelectedChat(null)} className="md:hidden p-1.5 hover:bg-gray-100 rounded-full">
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                            {selectedChat.name[0]}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold">{selectedChat.name}</h4>
                            <p className="text-[10px] text-green-500 font-medium">{selectedChat.online ? 'En línea' : 'Desconectado'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => showToast("Búsqueda no disponible")} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><Search className="w-4 h-4" /></button>
                          <button onClick={() => showToast("Opciones adicionales próximamente")} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white/50">
                        {selectedChat.messages.map(msg => (
                          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[90%] md:max-w-[85%] p-3 md:p-4 rounded-2xl md:rounded-3xl text-xs md:text-sm shadow-sm ${msg.sender === 'me' ? 'bg-[#0056d2] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'}`}>
                              {msg.text}
                              <div className={`text-[9px] md:text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>
                                {msg.time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 md:p-6 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2 md:gap-3 bg-gray-100 rounded-2xl px-3 md:px-5 py-1.5 md:py-2">
                          <button onClick={() => showToast("Emojis próximamente")} className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600"><Smile className="w-5 h-5 md:w-6 md:h-6" /></button>
                          <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Mensaje..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-xs md:text-sm py-2 md:py-3"
                          />
                          <button 
                            onClick={handleSendMessage}
                            className={`p-1.5 md:p-2 transition-colors ${chatInput.trim() ? 'text-[#0056d2]' : 'text-gray-300'}`}
                          >
                            <SendHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-10 h-10 text-blue-200" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-400">Selecciona un chat</h3>
                      <p className="text-sm text-gray-300">Comienza a chatear con tus contactos de Vuelo</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              !selectedEmail ? (
                <motion.div 
                  key="list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4"
                >
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <h2 className="text-lg md:text-xl font-bold">
                      {view === 'inbox' ? 'Bandeja' : 
                       view === 'sent' ? 'Enviados' : 
                       view === 'starred' ? 'Destacados' : 
                       view === 'archived' ? 'Archivados' : 
                       view === 'trash' ? 'Papelera' : ''}
                    </h2>
                    <div className="flex gap-1">
                      <button className="px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-lg">Todos</button>
                      <button className="px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-medium text-blue-600 bg-blue-50 rounded-lg">No leídos</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {filteredEmails.length > 0 ? filteredEmails.map((email) => (
                      <motion.div 
                        key={email.id}
                        onClick={() => setSelectedEmail(email)}
                        className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${email.read ? "bg-white border-gray-100 hover:border-gray-200" : "bg-blue-50/30 border-blue-100 hover:border-blue-200"}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-sm ${email.read ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-600"}`}>
                          {email.from[0]}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex justify-between items-center mb-0.5">
                            <h3 className={`text-xs truncate ${email.read ? "font-medium text-gray-700" : "font-bold text-[#1a1a1a]"}`}>{email.from}</h3>
                            <span className="text-[10px] text-gray-400 font-medium">{email.time}</span>
                          </div>
                          <h4 className={`text-xs mb-0.5 truncate ${email.read ? "text-gray-600" : "font-semibold text-gray-800"}`}>{email.subject}</h4>
                          <p className="text-[10px] text-gray-400 truncate">{email.snippet}</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <button 
                            onClick={(e) => toggleStar(email.id, e)}
                            className={`p-1.5 hover:bg-gray-100 rounded-lg transition-colors ${email.starred ? "text-yellow-500" : "text-gray-400 hover:text-blue-600"}`}
                          >
                            <Star className={`w-3.5 h-3.5 ${email.starred ? "fill-current" : ""}`} />
                          </button>
                          <button 
                            onClick={(e) => deleteEmail(email.id, e)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )) : (
                      <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mail className="w-8 h-8 text-gray-200" />
                        </div>
                        <p className="text-sm text-gray-400">No hay correos en esta sección</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full flex flex-col"
                >
                  <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <button 
                        onClick={() => setSelectedEmail(null)}
                        className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <h2 className="text-base md:text-lg font-bold mb-0.5 truncate max-w-[150px] sm:max-w-none">{selectedEmail.subject}</h2>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-50 text-blue-600 text-[8px] md:text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Recibido</span>
                          <span className="text-[9px] md:text-[10px] text-gray-400">{selectedEmail.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <button 
                        onClick={(e) => toggleStar(selectedEmail.id, e)}
                        className={`p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors ${selectedEmail.starred ? "text-yellow-500" : "text-gray-500"}`}
                      >
                        <Star className={`w-3.5 h-3.5 md:w-4 md:h-4 ${selectedEmail.starred ? "fill-current" : ""}`} />
                      </button>
                      <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Archive className="w-4 h-4" /></button>
                      <button 
                        onClick={(e) => deleteEmail(selectedEmail.id, e)}
                        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                      <div className="w-px h-5 bg-gray-100 mx-0.5 md:mx-1" />
                      <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-500"><MoreVertical className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm md:text-base">
                        {selectedEmail.from[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm md:text-base">{selectedEmail.from}</h3>
                        <p className="text-[10px] md:text-xs text-gray-400">para mí &lt;mperdom1@vuelo.email&gt;</p>
                      </div>
                    </div>
                    <div className="prose prose-sm prose-blue max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-xs md:text-sm">
                        {selectedEmail.body}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex gap-2 md:gap-3">
                      <button onClick={() => showToast("Función de respuesta próximamente")} className="flex-1 bg-white border border-gray-200 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">Responder</button>
                      <button onClick={() => showToast("Función de reenvío próximamente")} className="flex-1 bg-white border border-gray-200 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">Reenviar</button>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Floating Action Button - Adjusted size */}
        <button 
          onClick={() => setIsComposeOpen(true)}
          className="absolute bottom-8 right-8 w-14 h-14 bg-[#0056d2] rounded-2xl flex items-center justify-center shadow-2xl text-white hover:scale-110 hover:rotate-90 transition-all duration-500 group z-20"
        >
          <Plus className="w-7 h-7 group-hover:scale-125 transition-transform" />
        </button>

        {/* Compose Modal */}
        <AnimatePresence>
          {isComposeOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsComposeOpen(false)}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm z-30"
              />
              <motion.div 
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                className="fixed inset-x-4 bottom-4 md:inset-auto md:bottom-8 md:right-8 w-auto md:w-full md:max-w-md bg-white rounded-[1.5rem] shadow-2xl z-[60] overflow-hidden border border-gray-100"
              >
                <div className="bg-[#0056d2] p-4 md:p-5 text-white flex justify-between items-center">
                  <h3 className="font-bold text-sm md:text-base">Nuevo Mensaje</h3>
                  <button onClick={() => setIsComposeOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-3">
                  <div className="flex items-center border-b border-gray-100 py-1.5">
                    <span className="text-gray-400 text-[10px] md:text-xs font-medium w-10">Para:</span>
                    <input type="text" className="flex-1 bg-transparent border-none focus:ring-0 text-[10px] md:text-xs" />
                  </div>
                  <div className="flex items-center border-b border-gray-100 py-1.5">
                    <span className="text-gray-400 text-[10px] md:text-xs font-medium w-10">Asunto:</span>
                    <input type="text" className="flex-1 bg-transparent border-none focus:ring-0 text-[10px] md:text-xs" />
                  </div>
                  <textarea 
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full h-32 md:h-40 bg-transparent border-none focus:ring-0 text-[10px] md:text-xs resize-none"
                  />
                </div>
                <div className="p-4 md:p-5 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"><Paperclip className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"><ImageIcon className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"><Smile className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                  </div>
                  <button 
                    onClick={() => setIsComposeOpen(false)}
                    className="bg-[#0056d2] text-white px-5 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                  >
                    Enviar
                    <Send className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
