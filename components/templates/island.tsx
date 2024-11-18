'use client';

import React from 'react';
import ScrollIsland from '../organisms/scroll-island';
import SummaryPanel from '../molecules/summary-panel';

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
    <div className='fixed left-1/2 top-4 -translate-x-1/2'>
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
  );
};

export default IslandPanel;
