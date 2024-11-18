import { cn } from '@/utils';
import { motion } from 'framer-motion';
import React from 'react';

type CircularProgressProps = {
  className?: string;
  value: number;
};

const CircularProgress = ({
  value = 0,
  className,
  ...props
}: CircularProgressProps) => {
  return (
    <motion.div layout className={cn('relative size-5', className)}>
      <svg
        className='size-full -rotate-90'
        viewBox='0 0 36 36'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='18'
          cy='18'
          r='16'
          fill='none'
          className='stroke-current text-white'
          strokeWidth='4'
        ></circle>
        <circle
          cx='18'
          cy='18'
          r='16'
          fill='none'
          className='stroke-current text-gray-500'
          strokeWidth='4'
          strokeDasharray='100'
          strokeDashoffset={value}
          strokeLinecap='round'
        ></circle>
      </svg>
    </motion.div>
  );
};

export default CircularProgress;
