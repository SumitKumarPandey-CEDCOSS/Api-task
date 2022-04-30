import React, { Component } from 'react';
import { Base } from './core';
import Auth from './Auth/Auth'
import Panel from './Panel/Panel'
import translations from '@shopify/polaris/locales/en.json';
import { AppProvider, Frame } from '@shopify/polaris';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

class App extends Base {
    render() {
        return (
            <AppProvider i18n={translations}>
                <Frame>
                    <Router>
                        <Switch>
                            <Route path="/auth" component={Auth} />
                            <Route path="/panel" component={Panel}/>
                            <Redirect to="/auth" />
                        </Switch>

                    </Router>
                </Frame>
            </AppProvider>
        );
    }
}

export default App;