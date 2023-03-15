import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarCodeReader } from '../components';

export const ReaderPage = () => {
  const [reads, setReads] = useState<string[]>([]);

  const handleOnRead = useCallback((code: string) => {
    setReads((oldReads) => [...oldReads, code]);
  }, []);

  return (
    <div className={'reader-page'}>
      <div className={'reader-page__content'}>
        <Link className={'reader-page__content__home-link'} to={'/'}>
          Home
        </Link>
        <div className='reader-page__reader'>
          <BarCodeReader onRead={handleOnRead} onError={() => {}} />
        </div>
        <div>
          {reads.map((r, i) => (
            <div key={i}>{r}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
