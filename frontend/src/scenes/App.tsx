import * as React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client';
import {
    BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import HomePage from './home';
import Navbar from '../components/Topbar';
import './App.scss';
import { cache } from '../cache';

export const client = new ApolloClient({
    cache,
    connectToDevTools: true,
    link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
});

const AppLayout = (): JSX.Element => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div className="AppLayout">
                <Navbar />
                <main>
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Redirect from="*" to="/" />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    </ApolloProvider>
);

export default AppLayout;
