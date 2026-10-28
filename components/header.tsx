'use client';

import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import { HiMenu, HiX } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';
import { links } from '@/data/data';
import { useActiveSectionContext } from '@/context/active-section-context';
import ThemeSwitch from './theme-switch';

type LinkName = (typeof links)[number]['name'];

const Header = ({ name }: { name: string }) => {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const go = (name: LinkName) => {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
    setIsOpen(false);
  };

  const logo = (
    <Link
      href="#home"
      onClick={() => go('Home')}
      aria-label={`${name}, back to top`}
      className="flex items-center gap-2.5"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-sm font-bold text-white shadow-md shadow-indigo-500/30">
        {name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
      </span>
      <span className="hidden text-sm font-semibold tracking-tight min-[1100px]:inline">
        {name}
      </span>
    </Link>
  );

  const barClass = clsx(
    'fixed inset-x-0 top-3 z-[2] mx-auto w-[calc(100%-1.5rem)] max-w-5xl rounded-2xl border transition-all duration-300 lg:top-5 lg:rounded-full',
    scrolled
      ? 'border-line bg-surface/85 shadow-card backdrop-blur-xl'
      : 'border-line/50 bg-surface/50 shadow-none backdrop-blur-md',
  );

  return (
    <header>
      {/* Click-away layer for the mobile menu */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[1] cursor-default bg-gray-950/20 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Desktop */}
      <m.div
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={clsx(barClass, 'hidden lg:block')}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-3 pl-4">
          {logo}

          <nav aria-label="Primary">
            <ul className="flex items-center gap-0.5 text-sm font-medium text-ink-muted">
              {links.map((link) => {
                const active = activeSection === link.name;
                return (
                  <li key={link.hash} className="relative">
                    <Link
                      href={link.hash}
                      onClick={() => go(link.name)}
                      aria-current={active ? 'true' : undefined}
                      className={clsx(
                        'relative flex items-center px-3.5 py-2 transition-colors hover:text-ink',
                        active ? 'text-ink' : 'text-ink-muted',
                      )}
                    >
                      {link.name}
                      {active && (
                        <m.span
                          layoutId="activeSection"
                          className="absolute inset-0 -z-10 rounded-full bg-brand-soft"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeSwitch inline />
            <Link
              href="#contact"
              onClick={() => go('Contact')}
              className="group flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition-all hover:shadow-lg hover:shadow-indigo-500/40"
            >
              Let&apos;s talk
              <BsArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </m.div>

      {/* Mobile / tablet */}
      <m.div
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={clsx(barClass, 'lg:hidden')}
      >
        <div className="flex h-14 items-center justify-between px-3">
          {logo}
          <div className="flex items-center gap-1">
            <ThemeSwitch inline />
            <button
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-ink-muted transition hover:bg-surface-2"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </m.div>

      <AnimatePresence>
        {isOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed left-3 right-3 top-[4.75rem] z-[2] mx-auto max-w-5xl rounded-2xl border border-line bg-surface/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <m.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="flex flex-col gap-1"
            >
              {links.map((link) => {
                const active = activeSection === link.name;
                return (
                  <m.li
                    key={link.hash}
                    variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href={link.hash}
                      onClick={() => go(link.name)}
                      aria-current={active ? 'true' : undefined}
                      className={clsx(
                        'flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors',
                        active
                          ? 'bg-brand-soft text-brand-ink'
                          : 'text-ink-muted hover:bg-surface-2',
                      )}
                    >
                      {link.name}
                      {active && <span className="h-2 w-2 rounded-full bg-indigo-500" aria-hidden="true" />}
                    </Link>
                  </m.li>
                );
              })}
            </m.ul>
            <Link
              href="#contact"
              onClick={() => go('Contact')}
              className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-medium text-white"
            >
              Let&apos;s talk
              <BsArrowRight />
            </Link>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
