import React, { Component } from 'react'
import {Page, Card,TextField,Banner, Label} from '@shopify/polaris';
import { Base } from '../../core';
class Dashboard extends Base {

    constructor(){
        super()
    }

    render() {
        return (
            <Page title="Dashboard">
                <Card sectioned>
                    <Banner status="info">
                        <Label>
                            Write your Code here
                        </Label>
                    </Banner>
                </Card>
            </Page>
        )
    }
}

export default Dashboard
