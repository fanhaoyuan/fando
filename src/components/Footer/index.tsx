import { useMemo } from 'react';
import styles from './index.module.css';
import classnames from 'classnames';

export interface FooterProps {
    className?: string;
}

export function Footer(props: FooterProps) {
    const { className } = props;

    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer className={classnames(styles.footer, className)}>
            <p>&copy; {year} — MIT License</p>
        </footer>
    );
}
