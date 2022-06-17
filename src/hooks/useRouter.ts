import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { asyncRoutes, RouteRecord } from '../app.routes';

export function useRouter() {
    const { pathname } = useLocation();

    const [order, setOrder] = useState(-1);

    const [router, setRouter] = useState<RouteRecord>();

    useEffect(() => {
        const collection = asyncRoutes.find(item => item.path === '/')?.children ?? [];

        for (let i = 0; i < collection.length; i++) {
            if (pathname === collection[i].path) {
                setOrder(() => i);
                setRouter(collection[i]);
            }
        }
    }, [pathname]);

    return {
        router,
        order,
    };
}
