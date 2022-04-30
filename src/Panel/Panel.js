import React from 'react'
import Dashboard from './Component/Dashboard';
import Product from './Component/Product';
import Grid from './Component/Grid';
import {AppProvider, Frame, Navigation, TopBar} from '@shopify/polaris';
import {PackageMajor, ProductsMajor} from '@shopify/polaris-icons';
import '@shopify/polaris/dist/styles.css';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Base} from '../core';

export class Panel extends Base {

    render() {
        const topBarMarkup = (
            <TopBar/>
        );

        const navigationMarkup = (
            <Navigation>
                <Navigation.Section
                    items={[
                        {
                            label: 'Dashboard',
                            icon: PackageMajor,
                            onClick: () => this.props.history.push('/panel/dashboard')

                        },
                        {
                            label: 'Products',
                            icon: ProductsMajor,
                            onClick: () => this.props.history.push('/panel/product')
                        },
                        {
                            label: 'Grid',
                            icon: ProductsMajor,
                            onClick: () => this.props.history.push('/panel/grid')
                        },
                    ]}
                />
            </Navigation>
        );

        return (
            <AppProvider>
                <Frame topBar={topBarMarkup} navigation={navigationMarkup}>
                    <Switch>
                        <Route path="/panel/dashboard" component={Dashboard}/>
                        <Route path="/panel/product" component={Product}/>
                        <Route path="/panel/grid" component={Grid}/>
                        <Redirect to="/panel/dashboard"/>
                    </Switch>
                </Frame>
            </AppProvider>
        )
    }

}


export default Panel
