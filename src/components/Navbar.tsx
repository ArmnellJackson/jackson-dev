/*
  Componente Navbar: barra de navegación superior fija con efecto blur.
  Recibe la sección activa y un callback para cambiar entre vistas.
*/

import React from 'react';
import { Github } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = ['inicio', 'servicios', 'proyectos', 'contacto'];

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => (
  <nav className="sticky top-0 z-50 bg-[#001004]/80 backdrop-blur-md border-b border-green-900/30">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      {/* Logo: redirige a la sección inicio */}
      <div
        className="text-2xl font-black tracking-tighter text-green-500 cursor-pointer"
        onClick={() => onNavigate('inicio')}
      >
        JACKSON.DEV
      </div>

      {/* Enlaces de navegación: visibles solo en pantallas medianas y superiores */}
      <div className="hidden md:flex gap-8">
        {navItems.map((section) => (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            className={`text-sm font-medium uppercase tracking-widest hover:text-green-500 transition-colors ${
              activeSection === section ? 'text-green-500' : 'text-gray-400'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Accesos directos: GitHub y descarga de CV */}
      <div className="flex items-center gap-4">
        <a href="https://github.com/ArmnellJackson" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-500 transition-colors">
          <Github className="w-5 h-5" strokeWidth={2.5} />
        </a>
        <button className="uiverse-btn text-xs py-2 px-6 font-bold text-white">CV</button>
      </div>
    </div>
  </nav>
);

export default Navbar;
