import { cn } from '@/utils';
import NumberFlow from '@number-flow/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import React, { LegacyRef, PropsWithChildren, forwardRef } from 'react';
import CircularProgress from '../atoms/circular-progress';
import Tag from '../atoms/tag';
import { TSelected } from '../templates/island';

type IslandTopProps = PropsWithChildren & {
  open?: boolean;
  onClick: () => void;
  scrollPercentage: number;
  className?: string;
  currentIndex?: TSelected | null;
};

const animation = {
  initial: {
    opacity: 0,
    y: -20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: -20,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const IslandTop = forwardRef(
  (
    {
      open,
      onClick,
      className,
      currentIndex,
      scrollPercentage,
    }: IslandTopProps,
    ref?: LegacyRef<HTMLDivElement>
  ) => {
    return (
      <motion.div
        onClick={onClick}
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between gap-6 self-start',
          className
        )}
      >
        <div className='flex items-center gap-2'>
          <CircularProgress value={scrollPercentage} />
          <div className='flex h-5 min-w-20 max-w-44 items-center gap-1 overflow-hidden font-semibold text-white'>
            <AnimatePresence mode={'popLayout'}>
              <motion.p
                layout
                variants={animation}
                initial='initial'
                animate='show'
                exit='exit'
                transition={{ duration: 0.2 }}
                key={currentIndex?.key}
                className='mb-0 inline-block overflow-hidden text-ellipsis whitespace-nowrap text-xs'
              >
                {currentIndex?.label ?? 'Index'}
              </motion.p>
            </AnimatePresence>
            <ChevronDown
              className='transition-all'
              style={{ rotate: open ? '180deg' : '0deg' }}
              size={12}
            />
          </div>
        </div>
        <Tag>
          <NumberFlow value={scrollPercentage} suffix={'%'} />
        </Tag>
      </motion.div>
    );
  }
);

IslandTop.displayName = 'IslandTop';

export default IslandTop;
