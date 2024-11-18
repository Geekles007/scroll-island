'use client';

import { cn } from '@/utils';
import React, { HTMLAttributes, PropsWithChildren, memo } from 'react';
import CircularProgress from '../atoms/circular-progress';
import { ChevronDown } from 'lucide-react';
import Tag from '../atoms/tag';
import useScrollPercentage from '@/hooks/useScrollPercentage';
import NumberFlow from '@number-flow/react';
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { parseMarkdownSummary } from '@/helpers';
import useOutsideClick from '@/hooks/useOutsideClick';
import IslandTop from '../molecules/island-top';
import { TSelected } from '../templates/island';

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
  const containerRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    if (open) {
      onClick?.();
    }
  });

  return (
    <motion.div
      layout
      layoutId={layoutId}
      ref={containerRef}
      className={cn(`cursor-pointer overflow-hidden bg-slate-900 `)}
      style={{
        borderRadius: '16px',
      }}
    >
      <div
        className={cn(
          'relative flex flex-col gap-2',
          className,
          open ? 'p-4' : 'p-1'
        )}
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
