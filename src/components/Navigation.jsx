import { Link, useLocation } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';
import './Navigation.css';

function Navigation() {
    const location = useLocation();
    const { themeMode, toggleTheme } = useApp();

    return (
        <nav className="main-navigation">
            <div className="nav-brand">
                <Link to="/">
                    <h2>💻 Трекер технологий</h2>
                </Link>
            </div>

            <ul className="nav-menu">
                <li>
                    <Link
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        Главная
                    </Link>
                </li>
                <li>
                    <Link
                        to="/technologies"
                        className={location.pathname === '/technologies' ? 'active' : ''}
                    >
                        Все технологии
                    </Link>
                </li>
                <li>
                    <Link
                        to="/add-technology"
                        className={location.pathname === '/add-technology' ? 'active' : ''}
                    >
                        Добавить технологию
                    </Link>
                </li>
                <li>
                    <Link
                        to="/statistics"
                        className={location.pathname === '/statistics' ? 'active' : ''}
                    >
                        Статистика
                    </Link>
                </li>
                <li>
                    <Link
                        to="/settings"
                        className={location.pathname === '/settings' ? 'active' : ''}
                    >
                        Настройки
                    </Link>
                </li>
            </ul>

            <div className="theme-toggle">
                <Tooltip title={themeMode === 'light' ? 'Тёмная тема' : 'Светлая тема'}>
                    <IconButton onClick={toggleTheme} color="inherit">
                        {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>
                </Tooltip>
            </div>
        </nav>
    );
}

export default Navigation;