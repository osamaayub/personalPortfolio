'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { links } from '@/data/data';
import Link from 'next/link';
import clsx from 'clsx';
import { HiMenu, HiX } from 'react-icons/hi';
import { useActiveSectionContext } from '@/context/active-section-context';

const Header = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (name: string) => {
    setActiveSection("Home");
    setTimeOfLastClick(Date.now());
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[999]">
      {/* Background */}
      <motion.div
        className="fixed top-0 left-1/2 h-16 w-[calc(100%-1rem)] max-w-5xl -translate-x-1/2 rounded-none border border-white/40 bg-white/80 shadow-lg backdrop-blur-md sm:top-6 sm:h-[3.25rem] sm:rounded-full dark:border-black/40 dark:bg-gray-950/75"
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
      />

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 flex h-16 items-center justify-between px-5 sm:hidden">
        <span className="font-semibold text-lg dark:text-white">
          Portfolio
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-2xl text-gray-700 dark:text-gray-200"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 64 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 right-4 top-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900 sm:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.hash}>
                  <Link
                    href={link.hash}
                    onClick={() => handleClick(link.name)}
                    className={clsx(
                      'block rounded-lg px-4 py-3 transition hover:bg-gray-100 dark:hover:bg-gray-800',
                      {
                        'bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-white':
                          activeSection === link.name,
                      }
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="fixed left-1/2 top-[1.7rem] hidden w-[calc(100%-2rem)] max-w-[45rem] -translate-x-1/2 justify-center sm:flex">
        <ul className="flex items-center gap-x-2 text-sm font-medium text-gray-500">
          {links.map((link) => (
            <motion.li
              key={link.hash}
              className="relative"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                href={link.hash}
                onClick={() => handleClick(link.name)}
                className={clsx(
                  'relative flex items-center justify-center px-4 py-3 transition hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-300',
                  {
                    'text-gray-950 dark:text-gray-200':
                      activeSection === link.name,
                  }
                )}
              >
                {link.name}

                {activeSection === link.name && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-gray-800"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;