import { Outlet } from 'react-router-dom';
import { AppMenu } from './menu';

export const AppLayout = () => {
  return (
    <div className={'app-layout'}>
      <div className='app-layout__side-menu'>
        <header className={'app-layout__side-menu__header'}>
          <h1>Home manager</h1>
        </header>
        <section className='app-layout__content'>
          <AppMenu />
        </section>
      </div>
      <main className='app-layout__main'>
        <header className={'app-layout__main__header'}>
          <h1>Page title</h1>
        </header>
        <section className='app-layout__content'>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
