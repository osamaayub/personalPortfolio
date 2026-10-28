'use client';

import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
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
      <span className="hidden text-sm font-semibold tracking-tight min-[1100px]:inline dark:text-white">
        {name}
      </span>
    </Link>
  );

  const barClass = clsx(
    'fixed inset-x-0 top-3 z-[2] mx-auto w-[calc(100%-1.5rem)] max-w-5xl rounded-2xl border transition-all duration-300 lg:top-5 lg:rounded-full',
    scrolled
      ? 'border-gray-200/80 bg-white/85 shadow-lg shadow-gray-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/80'
      : 'border-gray-200/40 bg-white/50 shadow-none backdrop-blur-md dark:border-white/5 dark:bg-gray-950/40',
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
      <motion.div
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={clsx(barClass, 'hidden lg:block')}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-3 pl-4">
          {logo}

          <nav aria-label="Primary">
            <ul className="flex items-center gap-0.5 text-sm font-medium text-gray-500">
              {links.map((link) => {
                const active = activeSection === link.name;
                return (
                  <li key={link.hash} className="relative">
                    <Link
                      href={link.hash}
                      onClick={() => go(link.name)}
                      aria-current={active ? 'true' : undefined}
                      className={clsx(
                        'relative flex items-center px-3.5 py-2 transition-colors hover:text-gray-950 dark:hover:text-gray-200',
                        active ? 'text-gray-950 dark:text-white' : 'dark:text-gray-400',
                      )}
                    >
                      {link.name}
                      {active && (
                        <motion.span
                          layoutId="activeSection"
                          className="absolute inset-0 -z-10 rounded-full bg-indigo-50 dark:bg-white/10"
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
      </motion.div>

      {/* Mobile / tablet */}
      <motion.div
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
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed left-3 right-3 top-[4.75rem] z-[2] mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-gray-900/95"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="flex flex-col gap-1"
            >
              {links.map((link) => {
                const active = activeSection === link.name;
                return (
                  <motion.li
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
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5',
                      )}
                    >
                      {link.name}
                      {active && <span className="h-2 w-2 rounded-full bg-indigo-500" aria-hidden="true" />}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
            <Link
              href="#contact"
              onClick={() => go('Contact')}
              className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-medium text-white"
            >
              Let&apos;s talk
              <BsArrowRight />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
