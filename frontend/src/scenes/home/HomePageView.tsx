import React, { useEffect } from 'react';
import CategoryList from '../../components/CategoryList';
import { appMutations } from '../../operations/mutations';

const { setNavbarState } = appMutations;

const HomePage = (): JSX.Element => {
    useEffect(() => {
        setNavbarState({
            title: 'Keyword Manager ',
            actions: ['ADD_CATEGORY'],
        });
    }, []);

    return (
        <section className="HomePage">
            <CategoryList />
        </section>
    );
};

export default HomePage;
