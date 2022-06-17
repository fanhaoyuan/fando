import { Outlet } from 'react-router';
import { MDXProvider } from '@mdx-js/react';
import styles from './index.module.css';
import classnames from 'classnames';
import { NavigationLink, Heading, Blockquote, Link, Code, Pre } from '@FANDO_APP_SOURCE/components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

export interface ContentProps {
    className?: string;
}

export function Content(props: ContentProps) {
    const { className } = props;

    return (
        <section className={classnames(styles.content, className)}>
            <MDXProvider
                components={{
                    h1: p => <Heading {...p} level={1} anchor={false} />,
                    h2: p => <Heading {...p} level={2} />,
                    h3: p => <Heading {...p} level={3} />,
                    h4: p => <Heading {...p} level={4} />,
                    h5: p => <Heading {...p} level={5} />,
                    h6: p => <Heading {...p} level={6} />,
                    blockquote: p => <Blockquote {...p} />,
                    a: p => <Link {...p} />,
                    code: p => <Code {...p} />,
                    pre: p => <Pre {...p} />,
                }}
            >
                <Outlet />
            </MDXProvider>

            <div className={styles.navigationLinkGroup}>
                <NavigationLink className={classnames(styles.navigationLink, styles.prevLink)} to='#'>
                    <ArrowLeftOutlined className={styles.navigationLinkIcon} />
                    Prev
                </NavigationLink>
                <NavigationLink className={classnames(styles.navigationLink, styles.nextLink)} to='#'>
                    Next
                    <ArrowRightOutlined className={styles.navigationLinkIcon} />
                </NavigationLink>
            </div>
        </section>
    );
}
