/**
 * PlanilhaBR Footer - Clean & Professional
 * White background with subtle green accents
 */

import React from 'react';
import Link from "next/link";
import {
  EnvelopeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import PlanilhaBRLogo from '@/components/PlanilhaBRLogo';

const Footer = React.memo(function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: 'Financeiro', href: '/financeiro/', icon: CurrencyDollarIcon },
    { name: 'Estoque', href: '/estoque/', icon: DocumentTextIcon },
    { name: 'Vendas', href: '/vendas/', icon: ChartBarIcon },
    { name: 'RH', href: '/rh/', icon: UsersIcon },
  ];

  const links = {
    navegacao: [
      { name: 'Inicio', href: '/' },
      { name: 'Planilhas', href: '/planilhas' },
      { name: 'Sobre nos', href: '/sobre-nos' },
      { name: 'Contato', href: '/contato' },
    ],
    legal: [
      { name: 'Termos de Uso', href: '/termos' },
      { name: 'Privacidade', href: '/politica-privacidade' },
      { name: 'Cookies', href: '/politica-cookies' },
    ],
  };

  return (
    <footer className="relative bg-white border-t border-gray-200 overflow-hidden">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500" />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <PlanilhaBRLogo size="lg" showText={true} />
            </div>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-6 max-w-sm">
              Planilhas Excel profissionais e gratuitas para gestao financeira,
              controle de estoque, RH e muito mais. Desenvolvido no Brasil para
              empresas e profissionais.
            </p>
            <a
              href="mailto:contato@planilhabr.com"
              className="inline-flex items-center gap-2 text-[14px] text-green-600 hover:text-green-700 transition-colors group"
            >
              <EnvelopeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              contato@planilhabr.com
            </a>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-green-900 uppercase tracking-wider mb-4">
              Categorias Populares
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="flex items-center gap-2 text-[14px] text-gray-600 hover:text-green-600 transition-colors group"
                  >
                    <category.icon className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-green-900 uppercase tracking-wider mb-4">
              Navegacao
            </h3>
            <ul className="space-y-3">
              {links.navegacao.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-green-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-[13px] text-gray-500 text-center sm:text-left">
            © {currentYear} PlanilhaBR. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
