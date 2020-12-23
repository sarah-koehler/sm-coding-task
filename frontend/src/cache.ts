import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';
import { NavbarState } from './models/NavbarState';
import { KeywordManagerState } from './models/KeywordManagerState';

const navbarStateInitialValue: NavbarState = {
    title: '',
    actions: [],
};

export const navbarStateVar: ReactiveVar<NavbarState> = makeVar<NavbarState>(
    navbarStateInitialValue,
);

const keywordManagerStateInitialValue: KeywordManagerState = {
    addMode: false,
    editId: null,
};

export const keywordManagerStateVar: ReactiveVar<
    KeywordManagerState
> = makeVar<KeywordManagerState>(keywordManagerStateInitialValue);

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                navbarState: {
                    read() {
                        return navbarStateVar();
                    },
                },
                keywordManagerState: {
                    read() {
                        return keywordManagerStateVar();
                    },
                },
            },
        },
    },
    addTypename: false,
});
