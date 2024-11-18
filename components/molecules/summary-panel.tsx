import { getSlug, parseMarkdownSummary } from '@/helpers';
import React from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { motion } from 'framer-motion';
import { TSelected } from '../templates/island';
import { cn } from '@/utils';

type SummaryPanelProps = {
  text: string;
  setCurrentIndex: React.Dispatch<React.SetStateAction<TSelected | null>>;
  currentIndex: TSelected | null;
};

gsap.registerPlugin(ScrollToPlugin);

const SummaryPanel = ({
  text,
  setCurrentIndex,
  currentIndex,
}: SummaryPanelProps) => {
  const summary = parseMarkdownSummary(text);

  function scrollToId(id: string, offset = 0) {
    const element = document.getElementById(id);

    if (element) {
      const targetPosition = element.offsetTop + offset; // Calculate target position with offset

      gsap.to(window, {
        duration: 0.5, // Duration of the scroll animation
        scrollTo: { y: targetPosition }, // Scroll vertically to the calculated position
        ease: 'cubic-bezier(0.83, 0, 0.17, 1)', // Smooth easing
      });
    } else {
      console.error(`Element with ID '${id}' not found.`);
    }
  }

  console.log(currentIndex);

  return (
    <motion.div
      className='w-[350px] py-2'
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <ul className='flex flex-col gap-2 text-slate-200'>
        {summary.map((item, index) => (
          <li key={index} className='text-sm transition-all '>
            <a
              onClick={() => {
                const key = getSlug(item?.label);
                scrollToId(key, -80);
                setCurrentIndex({
                  label: item.label,
                  key,
                });
              }}
              className={cn(
                `hover:text-blue-500`,
                currentIndex?.key === item.key ? 'text-blue-500' : ''
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SummaryPanel;
