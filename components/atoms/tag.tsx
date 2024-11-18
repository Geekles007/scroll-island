import { cn } from '@/utils';
import { motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';

type TagProps = PropsWithChildren & {
  className?: string;
};

const Tag = ({ className, children, ...props }: TagProps) => {
  return (
    <motion.div
      layout
      className={cn(
        'rounded-full bg-slate-500 px-2 py-0.5 text-xs font-bold text-white',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Tag;
