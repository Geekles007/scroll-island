'use client';

import { cn } from '@/utils';
import React, { PropsWithChildren, memo } from 'react';
import useScrollPercentage from '@/hooks/useScrollPercentage';
import { motion } from 'framer-motion';
import useOutsideClick from '@/hooks/useOutsideClick';
import IslandTop from '../molecules/island-top';
import { TSelected } from '../templates/island';
import useMeasure from 'react-use-measure';

type ScrollIslandProps = PropsWithChildren & {
  open?: boolean;
  layoutId?: string;
  onClick: () => void;
  className?: string;
  currentIndex?: TSelected | null;
};

const ScrollIsland = ({
  className,
  children,
  onClick,
  layoutId,
  currentIndex,
  open,
}: ScrollIslandProps) => {
  const scrollPercentage = useScrollPercentage();
  const [ref, { width, height }] = useMeasure();
  const containerRef = React.useRef<HTMLDivElement>(null);

  console.log(width, height);

  return (
    <motion.div
      ref={containerRef}
      className={cn(`cursor-pointer overflow-hidden bg-slate-900 shadow-sm `)}
      style={{
        borderRadius: '16px',
      }}
      transition={{
        type: 'spring',
        stiffness: 100, // Contrôle la raideur du rebond
        damping: 18, // Contrôle la vitesse de l'arrêt
      }}
      animate={{
        width,
        height,
      }}
    >
      <div
        className={cn(
          'relative flex flex-col gap-2',
          className,
          open ? 'w-[350px] p-4' : 'w-[285px] p-1'
        )}
        ref={ref}
      >
        <IslandTop
          onClick={onClick}
          scrollPercentage={scrollPercentage}
          open={open}
          currentIndex={currentIndex}
        />
        {children}
      </div>
    </motion.div>
  );
};

export default memo(ScrollIsland);
