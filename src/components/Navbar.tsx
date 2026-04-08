/*
  Componente Navbar: barra de navegación superior fija con efecto blur.
  Incluye menú hamburguesa para móvil que agrupa enlaces de navegación y accesos directos.
  En desktop los enlaces y accesos se muestran en línea; en móvil se despliegan verticalmente.
*/

import React, { useState, useCallback } from 'react';
import { Github, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenCv: () => void;
}

const navItems = ['inicio', 'servicios', 'proyectos', 'contacto'];

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenCv }) => {
  /* Estado del menú hamburguesa en móvil */
  const [isOpen, setIsOpen] = useState(false);

  /* Navega a la sección indicada y cierra el menú móvil */
  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  /* En móvil (< 768px) abre el PDF directo en nueva pestaña; en desktop abre el modal */
  const handleCv = useCallback(() => {
    if (window.innerWidth < 768) {
      window.open('/CV-DEV.pdf', '_blank');
    } else {
      onOpenCv();
    }
    setIsOpen(false);
  }, [onOpenCv]);

  return (
    <nav className="sticky top-0 z-50 bg-[#001004]/80 backdrop-blur-md border-b border-green-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-0 sm:py-2.5 flex items-center justify-between">
        {/* Logo: redirige a la sección inicio */}
        <div
          className="text-xl sm:text-2xl font-black tracking-tighter text-green-500 cursor-pointer"
          onClick={() => handleNavigate('inicio')}
        >
          JACKSON.DEV
        </div>

        {/* Enlaces de navegación: visibles solo en desktop */}
        <div className="hidden md:flex gap-8">
          {navItems.map((section) => (
            <button
              key={section}
              onClick={() => handleNavigate(section)}
              className={`text-sm font-medium uppercase tracking-widest hover:text-green-500 transition-colors ${
                activeSection === section ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Accesos directos desktop: GitHub y CV */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/ArmnellJackson" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-500 transition-colors">
            <Github className="w-5 h-5" strokeWidth={2.5} />
          </a>
          <button className="uiverse-btn text-xs py-2 px-6 font-bold text-white" onClick={handleCv}>CV</button>
        </div>

        {/* Botón hamburguesa: visible solo en móvil */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-green-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Abrir menú de navegación"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú desplegable móvil: posicionado absoluto para flotar sobre el contenido */}
      {isOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full border-t border-green-900/30 bg-[#001004]/95 backdrop-blur-md z-50">
          <div className="px-4 py-4 space-y-1">
            {/* Enlaces de navegación en formato vertical */}
            {navItems.map((section) => (
              <button
                key={section}
                onClick={() => handleNavigate(section)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium uppercase tracking-widest rounded-lg transition-colors ${
                  activeSection === section
                    ? 'text-green-500 bg-green-500/10'
                    : 'text-gray-400 hover:text-green-500 hover:bg-green-500/5'
                }`}
              >
                {section}
              </button>
            ))}

            {/* Separador visual entre navegación y accesos */}
            <div className="border-t border-green-900/30 my-3"></div>

            {/* Accesos directos en móvil: GitHub y CV */}
            <div className="flex items-center gap-4 px-4 py-2">
              <a href="https://github.com/ArmnellJackson" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-500 transition-colors p-2">
                <Github className="w-5 h-5" strokeWidth={2.5} />
              </a>
              <button className="uiverse-btn text-xs py-2 px-6 font-bold text-white" onClick={handleCv}>CV</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
