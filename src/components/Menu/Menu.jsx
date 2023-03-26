import { NavLink } from 'react-router-dom';

import css from './Menu.module.css';

const Menu = () => {
    return (
        <div className={css.menu_wrap}>
          <NavLink className={css.menu_nav} to="/">
            Home
          </NavLink>
          <NavLink className={css.menu_nav} to="/movies">
            Movies
          </NavLink>
        </div>
      );
};

export default Menu;