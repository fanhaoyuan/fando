import { PropsWithChildren } from 'react';
import classnames from 'classnames';
import styles from './index.module.css';

export interface NavigationLinkProps {
    className?: string;
    to?: string;
}

export function NavigationLink(props: PropsWithChildren<NavigationLinkProps>) {
    const { children, to, className } = props;

    return (
        <a href={to} className={classnames(styles.navigationLink, className)}>
            {children}
        </a>
    );
}
