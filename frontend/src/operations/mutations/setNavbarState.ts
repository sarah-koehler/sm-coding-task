import { ReactiveVar } from '@apollo/client';
import { NavbarState } from '../../models/NavbarState';

export default (
    navbarStateReactiveVar: ReactiveVar<NavbarState>,
) => (state: NavbarState): void => {
    navbarStateReactiveVar(state);
};
