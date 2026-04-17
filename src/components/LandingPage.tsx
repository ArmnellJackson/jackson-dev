import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Code, Briefcase, Mail, Linkedin, Workflow } from 'lucide-react';
import { FaWhatsapp, FaAws } from 'react-icons/fa';
import {
  SiMysql, SiReact, SiNextdotjs, SiTailwindcss, SiJavascript,
  SiTypescript, SiGit, SiGithub, SiVercel, SiSupabase, SiAstro,
  SiPostgresql
} from 'react-icons/si';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MailModal from '@/components/MailModal';
import CvModal from '@/components/CvModal';
import LogoLoop from '@/components/LogoLoop';

/*
  Este componente gestiona el estado de la navegación de la landing page.
  Permite mostrar secciones individuales controladas por el Navbar.
*/

/* Sección Hero: recibe onNavigate para redirigir los botones CTA a sus secciones.
   Incluye carrusel LogoLoop de tecnologías en la parte superior.
   Layout responsivo: columna en móvil, fila en desktop. Tipografía fluida con clamp(). */
const Hero = ({ onNavigate }: { onNavigate: (section: string) => void }) => {
  /* Logos de tecnologías para el carrusel infinito, definidos dentro del componente
     para evitar problemas de serialización con JSX en la hidratación de Astro */
  const techLogos = useMemo(() => [
    { node: <SiMysql className="text-current" />, title: 'MySQL' },
    { node: <SiReact className="text-current" />, title: 'React' },
    { node: <SiNextdotjs className="text-current" />, title: 'Next.js' },
    { node: <SiTailwindcss className="text-current" />, title: 'Tailwind CSS' },
    { node: <SiJavascript className="text-current" />, title: 'JavaScript' },
    { node: <SiTypescript className="text-current" />, title: 'TypeScript' },
    { node: <SiGit className="text-current" />, title: 'Git' },
    { node: <SiGithub className="text-current" />, title: 'GitHub' },
    { node: <FaAws className="text-current" />, title: 'AWS' },
    { node: <SiVercel className="text-current" />, title: 'Vercel' },
    { node: <SiSupabase className="text-current" />, title: 'Supabase' },
    { node: <SiAstro className="text-current" />, title: 'Astro' },
    { node: <SiPostgresql className="text-current" />, title: 'PostgreSQL' },
  ], []);

  /* Flag de montaje: evita renderizar LogoLoop en SSR para prevenir mismatch de hidratación.
     El LogoLoop calcula dimensiones y copias dinámicamente, lo cual genera DOM distinto al SSR. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Hook para adaptar logoHeight según viewport: 20px en móvil, 40px en sm+ */
  const [logoHeight, setLogoHeight] = useState(24);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)');
    const update = (e: MediaQueryListEvent | MediaQueryList) => setLogoHeight(e.matches ? 16 : 24);
    update(mql);
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return (
  <section className="flex flex-col h-full">
    {/* Carrusel infinito de logos de tecnologías — solo se renderiza en cliente */}
    <div className="px-4 sm:px-6 pt-1.5 sm:pt-2 max-w-7xl mx-auto w-full text-green-500">
      {mounted && (
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight={logoHeight}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#001004"
          ariaLabel="Tecnologías utilizadas"
        />
      )}
    </div>

    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 flex-1 py-4 md:py-10 px-4 sm:px-6 max-w-7xl mx-auto w-full">
    <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white">
        Hola, soy <span className="text-green-500">Jackson</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-lg mx-auto md:mx-0">
        Desarrollador Full Stack enfocado en crear Apps Web modernas, interactivas, eficientes y fáciles de usar.
      </p>
      <div className="flex gap-4 justify-center md:justify-start">
        <button className="uiverse-btn" onClick={() => onNavigate('proyectos')}>Proyectos</button>
        <button className="uiverse-btn" style={{ background: 'transparent', border: '1px solid #22c55e', color: '#22c55e' }} onClick={() => onNavigate('contacto')}>Contacto</button>
      </div>
    </div>
    <div className="flex-1 flex justify-center">
      <div className="neumorph-container w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 flex items-center justify-center overflow-hidden">
        <img
          src="/theDeveloper.png"
          alt="Jackson Developer"
          className="w-full h-full object-cover rounded-[40px]"
        />
      </div>
    </div>
    </div>
  </section>
  );
};

/* Sección Servicios: grid de cards con layout responsivo.
   En móvil las cards se apilan verticalmente sin centrado vertical para permitir scroll desde el inicio.
   En desktop se centran verticalmente y se muestran en 3 columnas. */
const Servicios = () => (
  <section className="py-8 md:py-10 px-4 sm:px-6 max-w-7xl mx-auto md:h-full flex flex-col md:justify-center space-y-8 md:space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
            <CardTitle className="text-white text-lg sm:text-xl">{item.title}</CardTitle>
            <p className="text-gray-400 text-sm sm:text-base">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

/* Sección de proyectos: permite scroll vertical para contenido extenso.
   Grid adaptativo: 1 columna en móvil, 2 en desktop. Tipografía escalada. */
const Projects = () => (
  <section className="py-8 md:py-10 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col space-y-8 md:space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {[
        { name: 'Sistema Ventas', desc: 'Sistema web completo para la gestión comercial de un negocio: control de inventario, clientes, ventas y métricas. Construido con Next.js 16, Google Sheets como base de datos y Supabase para autenticación con roles.', repo: 'https://github.com/ArmnellJackson/demoSistemaVentas', live: 'https://demo-sistema-ventas.vercel.app/', img: '/loginDemoSistemaVentas.png' },
        { name: 'Catálogo Dealer Autos', desc: 'Catalogo para Dealer de autos de lujo, desarrollad con Astro, Tailwind CSS v4 y componentes basados en shadcn/ui. Supabase como DB Y Auth. Flujo de n8n para avisar a la cartera de clientes cuando se agrega un nuevo auto por WhatsApp. Dashboard de control hecho con Nextjs.', repo: 'https://github.com/ArmnellJackson/catalogo-dealer-autos', live: 'https://catalogo-dealer-autos.vercel.app/', img: '/catalog-dealer-cars.png' },
        { name: 'Proyecto 3', desc: 'Una descripción breve del impacto y la tecnología utilizada en este desarrollo innovador.', repo: '#', live: '#', img: '' },
        { name: 'Proyecto 4', desc: 'Una descripción breve del impacto y la tecnología utilizada en este desarrollo innovador.', repo: '#', live: '#', img: '' },
      ].map((project, i) => (
        <div key={i} className="neumorph-container p-3 sm:p-4 overflow-hidden group">
          {/* Imagen cliqueable: muestra captura del proyecto o placeholder genérico */}
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="block aspect-video bg-gray-800 rounded-[20px] sm:rounded-[30px] mb-3 sm:mb-4 overflow-hidden cursor-pointer">
            {project.img ? (
              <img src={project.img} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-900 to-black flex items-center justify-center opacity-50 group-hover:scale-105 transition-transform duration-500">
                <Code className="w-10 h-10 sm:w-12 sm:h-12 text-white opacity-20" />
              </div>
            )}
          </a>
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{project.name}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{project.desc}</p>
            </div>
            {/* Icono de código: lleva al repositorio del proyecto */}
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors ml-3 sm:ml-4 shrink-0 p-1" title="Ver código fuente">
              <Code className="w-6 h-6" />
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* Sección de contacto: el botón de Mail abre un modal con formulario Formspree.
   Padding y tipografía adaptados a móvil; botones con tamaño mínimo de toque (44px). */
const Contact = ({ onOpenMail }: { onOpenMail: () => void }) => (
  <section className="py-8 md:py-10 px-4 sm:px-6 max-w-7xl mx-auto h-full flex flex-col justify-center space-y-8 md:space-y-12">
    <div className="max-w-2xl mx-auto neumorph-container p-6 sm:p-10 space-y-6 sm:space-y-8 w-full">
      <p className="text-center text-gray-400 text-base sm:text-lg">¿Tienes un proyecto en mente? ¡Hablemos y hagámoslo realidad!</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <a href="https://www.linkedin.com/in/armnell-jackson-gomez-garcia-b01619152/" target="_blank" rel="noopener noreferrer" className="uiverse-btn p-3 sm:p-4"><Linkedin /></a>
        <a href="https://wa.me/51934272882?text=Hola%2C%20vengo%20de%20tu%20Landing%20page%20%27Jackson.Dev%27" target="_blank" rel="noopener noreferrer" className="uiverse-btn p-3 sm:p-4"><FaWhatsapp size={24} /></a>
        <button className="uiverse-btn p-3 sm:p-4" onClick={onOpenMail}><Mail /></button>
      </div>
    </div>
  </section>
);

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'inicio': return <Hero onNavigate={setActiveSection} />;
      case 'servicios': return <Servicios />;
      case 'proyectos': return <Projects />;
      case 'contacto': return <Contact onOpenMail={() => setIsMailOpen(true)} />;
      default: return <Hero onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#001004] text-white font-sans selection:bg-green-500 selection:text-black">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} onOpenCv={() => setIsCvOpen(true)} />

      {/* Main Content with Transition Effect Placeholder */}
      {/* Área principal: ocupa el espacio restante entre navbar y footer */}
      <main className={`flex-1 min-h-0 animate-in fade-in duration-700 flex flex-col ${activeSection === 'proyectos' || activeSection === 'servicios' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        {renderSection()}
      </main>

      <Footer />

      {/* Modal de correo: se renderiza sobre todo el contenido */}
      <MailModal isOpen={isMailOpen} onClose={() => setIsMailOpen(false)} />

      {/* Modal de CV: muestra el PDF del curriculum vitae */}
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </div>
  );
};

export default LandingPage;
