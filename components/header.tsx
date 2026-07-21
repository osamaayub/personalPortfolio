'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { links } from '@/data/data';
import Link from 'next/link';
import clsx from 'clsx';
import { useActiveSectionContext } from '@/context/active-section-context';

const Header = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className='z-[999] relative'>
      <motion.div
        className='fixed top-0 left-1/2 h-auto min-h-[4.5rem] w-[calc(100%-0.75rem)] max-w-[48rem] rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 px-2 py-2 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:min-h-[3.25rem] sm:w-[calc(100%-2rem)] sm:max-w-[44rem] sm:rounded-full sm:px-4 sm:py-0 md:max-w-[46rem] dark:border-black/40 dark:bg-gray-950 dark:bg-opacity-75'
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
      ></motion.div>

      <nav className='fixed left-1/2 top-2 flex w-[calc(100%-1.25rem)] max-w-[47rem] -translate-x-1/2 justify-center py-1 sm:top-[1.7rem] sm:w-[calc(100%-2.5rem)] sm:max-w-[43rem] md:max-w-[45rem]'>
        <ul className='flex max-w-full flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-[0.78rem] font-medium text-gray-500 sm:flex-nowrap sm:gap-x-2 sm:text-[0.82rem] md:gap-x-2.5 md:text-[0.875rem]'>
          {links.map((link) => (
            <motion.li
              className='relative flex items-center justify-center'
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  'flex items-center justify-center whitespace-nowrap px-2 py-2 transition hover:text-gray-950 sm:px-2.5 sm:py-2.5 dark:text-gray-500 dark:hover:text-gray-300',
                  {
                    'text-gray-950 dark:text-gray-200':
                      activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className='bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800'
                    layoutId='activeSection'
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
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
