import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarCodeReader } from '../components';

export const ReaderPage = () => {
  const [lastRead, setLastRead] = useState<string>('');

  const handleOnRead = useCallback((code: string) => {
    setLastRead(code);
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
        <div className={'reader-page__last-read'}>{lastRead}</div>
      </div>
    </div>
  );
};
