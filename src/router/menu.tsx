import { Link } from 'react-router-dom';

export const AppMenu = () => {
  return (
    <div className='menu'>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'reader'}>Reader</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
