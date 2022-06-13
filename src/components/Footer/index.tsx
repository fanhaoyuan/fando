import { useMemo } from 'react';
import styles from './index.module.css';

export function Footer() {
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer className={styles.footer}>
            <p>&copy; {year} — MIT License</p>
        </footer>
    );
}
