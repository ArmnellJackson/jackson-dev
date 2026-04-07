import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Code, Briefcase, Mail, Linkedin, Workflow } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* 
  Este componente gestiona el estado de la navegación de la landing page.
  Permite mostrar secciones individuales controladas por el Navbar.
*/

const Hero = () => (
  <section className="flex flex-col md:flex-row items-center justify-between gap-12 py-10 px-6 max-w-7xl mx-auto h-full">
    <div className="flex-1 space-y-6">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
        Hola, soy <span className="text-green-500">Jackson</span>
      </h1>
      <p className="text-xl text-gray-400 max-w-lg">
        Desarrollador Full Stack enfocado en crear Apps Web modernas, interactivas, eficientes y fáciles de usar.
      </p>
      <div className="flex gap-4">
        <button className="uiverse-btn">Proyectos</button>
        <button className="uiverse-btn" style={{ background: 'transparent', border: '1px solid #22c55e', color: '#22c55e' }}>Contacto</button>
      </div>
    </div>
    <div className="flex-1 flex justify-center">
      <div className="neumorph-container w-64 h-64 md:w-96 md:h-96 flex items-center justify-center overflow-hidden">
        <img 
          src="/theDeveloper.png" 
          alt="Jackson Developer" 
          className="w-full h-full object-cover rounded-[40px]"
        />
      </div>
    </div>
  </section>
);

const Servicios = () => (
  <section className="py-10 px-6 max-w-7xl mx-auto h-full flex flex-col justify-center space-y-12">
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-bold text-white">Servicios</h2>
      <div className="w-20 h-1 bg-green-500 mx-auto"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: 'Apps Empresariales', icon: <Briefcase className="w-8 h-8 text-green-500" />, desc: 'Aplicaciones web completas para empresas de cualquier rubro. Como consultorios médicos y veterinarios (citas online, historias clínicas), Restaurantes (pedidos, reservas, inventario), Sistemas de Recursos Humanos (gestión de empleados, nómina, asistencias, vacaciones.) etc.' },
        { title: 'E-commerce', icon: <ShoppingCart className="w-8 h-8 text-green-500" />, desc: 'Plataformas de comercio electrónico con pasarelas de pago seguras, gestión de inventario, carrito de compras y panel de administración completo.' },
        { title: 'Automatizaciones', icon: <Workflow className="w-8 h-8 text-green-500" />, desc: 'Flujos de trabajo automatizados con n8n para integrar servicios, sincronizar datos, enviar notificaciones y eliminar tareas repetitivas en tu negocio.' }
      ].map((item, idx) => (
        <Card key={idx} className="bg-[#001905] border-none shadow-none neumorph-container p-4">
          <CardHeader className="flex items-center justify-center">
            {item.icon}
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <CardTitle className="text-white">{item.title}</CardTitle>
            <p className="text-gray-400">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

/* Sección de proyectos: permite scroll vertical para contenido extenso */
const Projects = () => (
  <section className="py-10 px-6 max-w-7xl mx-auto flex flex-col space-y-12">
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-bold text-white">Proyectos Destacados</h2>
      <div className="w-20 h-1 bg-green-500 mx-auto"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="neumorph-container p-4 overflow-hidden group">
          <div className="aspect-video bg-gray-800 rounded-[30px] mb-4 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-green-900 to-black flex items-center justify-center opacity-50 group-hover:scale-105 transition-transform duration-500">
               <Code className="w-12 h-12 text-white opacity-20" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Proyecto {i}</h3>
          <p className="text-gray-400 mb-4">Una descripción breve del impacto y la tecnología utilizada en este desarrollo innovador.</p>
          <button className="uiverse-btn text-sm py-2 px-4">Ver Detalles</button>
        </div>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section className="py-10 px-6 max-w-7xl mx-auto h-full flex flex-col justify-center space-y-12">
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-bold text-white">Contacto</h2>
      <div className="w-20 h-1 bg-green-500 mx-auto"></div>
    </div>
    <div className="max-w-2xl mx-auto neumorph-container p-10 space-y-8 w-full">
      <p className="text-center text-gray-400 text-lg">¿Tienes un proyecto en mente? ¡Hablemos y hagámoslo realidad!</p>
      <div className="flex justify-center gap-8">
        <a href="https://www.linkedin.com/in/armnell-jackson-gomez-garcia-b01619152/" target="_blank" rel="noopener noreferrer" className="uiverse-btn p-4"><Linkedin /></a>
        <a href="https://wa.me/51934272882?text=Hola%2C%20vengo%20de%20tu%20Landing%20page%20%27Jackson.Dev%27" target="_blank" rel="noopener noreferrer" className="uiverse-btn p-4"><FaWhatsapp size={24} /></a>
        <a href="#" className="uiverse-btn p-4"><Mail /></a>
      </div>
    </div>
  </section>
);

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  const renderSection = () => {
    switch (activeSection) {
      case 'inicio': return <Hero />;
      case 'servicios': return <Servicios />;
      case 'proyectos': return <Projects />;
      case 'contacto': return <Contact />;
      default: return <Hero />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#001004] text-white font-sans selection:bg-green-500 selection:text-black">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />

      {/* Main Content with Transition Effect Placeholder */}
      {/* Área principal: ocupa el espacio restante entre navbar y footer */}
      <main className={`flex-1 min-h-0 animate-in fade-in duration-700 flex flex-col ${activeSection === 'proyectos' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        {renderSection()}
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
