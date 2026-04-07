import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Code, Briefcase, Mail, Github, Linkedin, Twitter } from 'lucide-react';

/* 
  Este componente gestiona el estado de la navegación de la landing page.
  Permite mostrar secciones individuales controladas por el Navbar.
*/

const Hero = () => (
  <section className="flex flex-col md:flex-row items-center justify-between gap-12 py-20 px-6 max-w-7xl mx-auto min-h-[80vh]">
    <div className="flex-1 space-y-6">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
        Hola, soy <span className="text-green-500">Jackson</span>
      </h1>
      <p className="text-xl text-gray-400 max-w-lg">
        Desarrollador Full Stack apasionado por crear interfaces modernas, interactivas y eficientes. Especialista en React, Astro y diseño de interfaces de alto impacto.
      </p>
      <div className="flex gap-4">
        <button className="uiverse-btn">Proyectos</button>
        <button className="uiverse-btn" style={{ background: 'transparent', color: '#fff', border: '1px solid #333' }}>Contacto</button>
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

const About = () => (
  <section className="py-20 px-6 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center space-y-12">
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-bold text-white">Sobre Mí</h2>
      <div className="w-20 h-1 bg-green-500 mx-auto"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: 'Experiencia', icon: <Briefcase className="w-8 h-8 text-green-500" />, desc: '5+ años construyendo soluciones digitales para startups y empresas globales.' },
        { title: 'Habilidades', icon: <Code className="w-8 h-8 text-green-500" />, desc: 'Experticia en el ecosistema moderno de JavaScript, incluyendo React, Node.js y Next.js.' },
        { title: 'Enfoque', icon: <User className="w-8 h-8 text-green-500" />, desc: 'Centrado en la experiencia del usuario y en escribir código limpio y mantenible.' }
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

const Projects = () => (
  <section className="py-20 px-6 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center space-y-12">
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
  <section className="py-20 px-6 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center space-y-12">
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-bold text-white">Contacto</h2>
      <div className="w-20 h-1 bg-green-500 mx-auto"></div>
    </div>
    <div className="max-w-2xl mx-auto neumorph-container p-10 space-y-8 w-full">
      <p className="text-center text-gray-400 text-lg">¿Tienes un proyecto en mente? ¡Hablemos y hagámoslo realidad!</p>
      <div className="flex justify-center gap-8">
        <a href="#" className="uiverse-btn p-4"><Github /></a>
        <a href="#" className="uiverse-btn p-4"><Linkedin /></a>
        <a href="#" className="uiverse-btn p-4"><Twitter /></a>
        <a href="#" className="uiverse-btn p-4"><Mail /></a>
      </div>
      <div className="pt-8 text-center">
        <button className="uiverse-btn w-full">Enviar Mensaje</button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-3 px-6 border-t border-green-900/20 text-center">
    <p className="text-gray-500 text-sm">© 2026 Jackson. Todos los derechos reservados.</p>
  </footer>
);

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  const renderSection = () => {
    switch (activeSection) {
      case 'inicio': return <Hero />;
      case 'sobre': return <About />;
      case 'proyectos': return <Projects />;
      case 'contacto': return <Contact />;
      default: return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-[#001004] text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#001004]/80 backdrop-blur-md border-b border-green-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter text-green-500 cursor-pointer" onClick={() => setActiveSection('inicio')}>
            JACKSON.DEV
          </div>
          <div className="hidden md:flex gap-8">
            {['inicio', 'sobre', 'proyectos', 'contacto'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-sm font-medium uppercase tracking-widest hover:text-green-500 transition-colors ${activeSection === section ? 'text-green-500' : 'text-gray-400'}`}
              >
                {section}
              </button>
            ))}
          </div>
          <button className="uiverse-btn text-xs py-2 px-6">CV</button>
        </div>
      </nav>

      {/* Main Content with Transition Effect Placeholder */}
      <main className="animate-in fade-in duration-700 min-h-[calc(100vh-140px)]">
        {renderSection()}
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
