import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarCodeReader } from '../components';

export const ReaderPage = () => {
  const [reads, setReads] = useState<string[]>([]);

  return (
    <div className={'reader-page'}>
      <div className={'reader-page__content'}>
        <h1>Start scanning!</h1>
        <div className='reader-page__reader'>
          <BarCodeReader
            onRead={(code) => {
              setReads([...reads, code]);
            }}
          />
        </div>
        <div>
          {reads.map((r, i) => (
            <div key={i}>{r}</div>
          ))}
        </div>
        <Link to={'/'}>Home</Link>
      </div>
    </div>
  );
};
