import * as React from 'react';
import { Navbar } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_NAVBAR_STATE } from '../../operations/queries/getNavbarState';
import AddCategoryButton from '../AddCategoryButton';
import { NavbarAction } from '../../models/NavbarState';

const renderNavbarAction = (action: NavbarAction): JSX.Element | null => {
    switch (action) {
        case 'ADD_CATEGORY':
            return <AddCategoryButton key={action} />;
        default:
            return null;
    }
};

const Topbar = (): JSX.Element => {
    const { title, actions } = useQuery(GET_NAVBAR_STATE).data.navbarState;

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>{title || <>&nbsp;</>}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {actions.map(renderNavbarAction)}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Topbar;
