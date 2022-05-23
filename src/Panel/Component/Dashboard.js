import React, { Component } from 'react'
import {Page, Card,TextField,Banner, Label} from '@shopify/polaris';
import { Base } from '../../core';
import { Chart } from './Chart';
import { PieChart } from './PieChart';
// import { LineChart } from './LineChart';
import HorizontalChart from './Horizontalchart';
class Dashboard extends Base {
    
    render() {
        return (
            <Page title="Dashboard">
                <Card sectioned>
                    <Chart />
                </Card>
                <Card sectioned >
                    <PieChart />
                </Card>
                {/* <Card sectioned >
                    <LineChart />
                </Card> */}
                <Card sectioned >
                {<HorizontalChart />}
                </Card>
            </Page>
        )
    }
}

export default Dashboard
