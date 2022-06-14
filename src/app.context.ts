import constate from 'constate';
import { useMemo } from 'react';

export interface AppContext {
    logo?: string;
    repository?: string;
    version?: string;
    title?: string;
}

const [AppContextProvider, useAppContext] = constate(() => {
    const { logo, repository, version, title } = useMemo<AppContext>(() => {
        try {
            // @ts-expect-error
            return JSON.parse(process.env.__APP_CONTEXT__);
        } catch (error) {
            return {};
        }
    }, []);

    return {
        logo,
        repository,
        version,
        title,
    } as AppContext;
});

export { AppContextProvider, useAppContext };
