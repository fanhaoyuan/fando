import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { BasicLayout } from './layouts';

export interface RouteRecordMeta {
    title?: string;
    order?: number;
}

export interface RouteRecord {
    path: string;
    component?:
        | React.LazyExoticComponent<() => JSX.Element>
        | ((props: React.PropsWithChildren<Record<string, any>>) => JSX.Element);
    children?: RouteRecord[];
    redirect?: string;
    meta?: RouteRecordMeta;
}

export const asyncRoutes: RouteRecord[] = [
    {
        path: '/',
        component: BasicLayout,
        children: [],
    },
];

const modules = import.meta.globEager(`@FANDO_APP_DOCS_PATH/**/*.md(x)?`);

Object.keys(modules).forEach(path => {
    const { default: component, ...meta } = modules[path];

    const _path = new URL(path, import.meta.url).pathname
        .replace(new RegExp(__FANDO_APP_DOCS_PATH__), '/')
        .replace(/\.md(x)?/, '')
        .replace(/\/index$/, '/')
        .replace(/\/\/(\/)?/g, '/');

    asyncRoutes[0].children?.push({
        path: _path,
        component,
        meta: {
            title: 'Anonymous',
            ...meta,
        },
    });
});

function registerAsyncRoutes(routes: RouteRecord[]) {
    return routes.map(route => {
        const DynamicComponent = route.component;

        if (!DynamicComponent) {
            return null;
        }

        return (
            <Route path={route.path} key={route.path} element={<DynamicComponent />}>
                {route.children?.length && registerAsyncRoutes(route.children)}
            </Route>
        );
    });
}

export function Router() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Suspense fallback={false}>
                <Routes>{registerAsyncRoutes(asyncRoutes)}</Routes>
            </Suspense>
        </BrowserRouter>
    );
}
