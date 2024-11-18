import { paragraph } from '@/constants';
import { getCompleteJSX } from '@/helpers';
import React from 'react';
import IslandPanel from '../templates/island';

const Paragraph = () => {
  return (
    <div className='prose relative px-4 py-12'>
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 h-16 w-screen bg-gradient-to-b from-white via-white/75 to-transparent`}
      />
      <IslandPanel text={paragraph} />
      {getCompleteJSX(paragraph)}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 h-16 w-screen bg-gradient-to-t from-white via-white/75 to-transparent`}
      />
    </div>
  );
};

export default Paragraph;
