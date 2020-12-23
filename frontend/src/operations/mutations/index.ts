import setNavbarState from './setNavbarState';
import setKeywordManagerStateState from './setKeywordManagerStateState';
import { navbarStateVar, keywordManagerStateVar } from '../../cache';

export const appMutations = {
    setNavbarState: setNavbarState(navbarStateVar),
    setKeywordManagerStateState: setKeywordManagerStateState(keywordManagerStateVar),
};
