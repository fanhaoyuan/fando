import styles from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

export interface NavigationItem {
    title: string;
    path: string;
}

export interface NavigationProps {
    routes?: NavigationItem[];
    className?: string;
}

export function Navigation(props: NavigationProps) {
    const { routes = [], className } = props;

    const { pathname } = useLocation();

    return (
        <nav className={classnames(styles.navigation, className)}>
            <ul className={styles.navigationMenu}>
                {routes.map(router => {
                    const { title, path } = router;

                    return (
                        <li
                            key={path}
                            className={classnames(styles.navigationItem, {
                                [styles.active]: path === pathname,
                            })}
                        >
                            <Link to={path}>{title}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
