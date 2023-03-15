import { Link } from 'react-router-dom';
import { BarCodeReader } from '../components';

export const ReaderPage = () => {
  return (
    <div className={'reader-page'}>
      <div className={'reader-page__content'}>
        <h1>Start scanning!</h1>
        <div className='reader-page__reader'>
          <BarCodeReader />
        </div>
        <Link to={'/'}>Home</Link>
      </div>
    </div>
  );
};
