'use client';

import React from 'react';
import ScrollIsland from '../organisms/scroll-island';
import SummaryPanel from '../molecules/summary-panel';
import { AnimatePresence, motion } from 'framer-motion';

type IslandPanelProps = {
  text: string;
};

export type TSelected = {
  key: string;
  label: string;
};

const IslandPanel = ({ text }: IslandPanelProps) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<TSelected | null>(null);

  return (
    <>
      <div className='fixed left-1/2 top-4 z-10 -translate-x-1/2'>
        <ScrollIsland
          onClick={() => setOpen((open) => !open)}
          layoutId={'island'}
          open={open}
          currentIndex={selected}
        >
          {open && (
            <SummaryPanel
              currentIndex={selected}
              setCurrentIndex={setSelected}
              text={text}
            />
          )}
        </ScrollIsland>
      </div>
      <AnimatePresence mode={'popLayout'}>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 h-screen w-screen bg-white/10 backdrop-blur-lg'
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default IslandPanel;
