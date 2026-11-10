'use client';

import Image from 'next/image';
import type { PublicProject } from '@/lib/types';
import { m, useReducedMotion, useSpring } from 'framer-motion';

const Project = ({ title, description, tags, image, url, github, index }: PublicProject & { index: number }) => {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 24 });

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.article
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -40px 0px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: (index % 3) * 0.09 }}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1200,
      }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-[#e4e2dc] bg-white shadow-[0_8px_24px_-16px_rgba(29,30,34,0.28)] transition-[box-shadow,border-color,transform] duration-300 group-hover:border-brand/30 group-hover:shadow-card-hover dark:border-line dark:bg-surface dark:shadow-card md:min-h-[30rem]"
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        rotateX.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 6);
        rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
      }}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-line bg-[#efeee9] dark:bg-surface-2">
        <m.div
          initial={reduceMotion ? false : { scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.09 }}
          className="absolute inset-0"
        >
          {image ? (
            <Image
              src={image}
              alt={`${title} project preview`}
              fill
              unoptimized={/^https?:/.test(image)}
              sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
              className='object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]'
            />
          ) : (
            // Projects saved without an image get a tile instead of an empty src.
            <div
              aria-hidden='true'
              className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-violet-100 to-fuchsia-100 text-6xl font-bold text-indigo-300 dark:from-indigo-950 dark:via-violet-950 dark:to-fuchsia-950 dark:text-indigo-700'
            >
              {title.charAt(0).toUpperCase()}
            </div>
          )}
        </m.div>
        <div aria-hidden='true' className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        <div aria-hidden='true' className='pointer-events-none absolute -inset-y-1/2 left-[-45%] w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 motion-safe:transition-[left,opacity] motion-safe:duration-700 motion-safe:group-hover:left-[120%] motion-safe:group-hover:opacity-100' />
      </div>
      <div className='flex min-w-0 flex-1 flex-col p-5 sm:p-6'>
        <h3 className='line-clamp-2 min-h-[3.5rem] text-xl font-semibold leading-7 tracking-tight text-ink'>{title}</h3>
        <p className='mt-2 line-clamp-3 leading-relaxed text-ink-muted'>
          {description}
        </p>

        <ul className='mt-4 flex flex-wrap gap-1.5'>
          {tags.map((tag) => (
            <li
              key={tag}
              className='rounded-full border border-brand/10 bg-[#f4f2ff] px-2.5 py-1 text-[11px] font-medium text-[#5145a4] dark:border-brand/15 dark:bg-brand-soft dark:text-brand-ink'
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className='mt-auto flex flex-wrap items-center gap-2 pt-5 text-sm'>
          {url && (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`View ${title} live demo (opens in a new tab)`}
              className='inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 py-2 font-medium text-canvas transition-colors hover:bg-brand'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                />
              </svg>
              Live Demo
            </a>
          )}
          {github && (
            <a
              href={github}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`View ${title} on GitHub (opens in a new tab)`}
              className='inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-4 py-2 font-medium text-ink-muted transition-colors hover:border-brand/40 hover:bg-brand-soft hover:text-brand-ink'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
                className='w-4 h-4'
              >
                <path d='M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.26 1.87 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0C16.7 5.1 17.7 5.42 17.7 5.42c.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.83.58A12 12 0 0012 0z' />
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </m.article>
  );
};

export default Project;