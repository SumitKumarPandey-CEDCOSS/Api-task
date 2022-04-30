import React, { Component } from 'react'
import { Button, Page, Card, FormLayout, TextField, Toast } from '@shopify/polaris';

import { Base } from '../../core';

export default class Login extends Base {
    constructor() {
        super()
        this.state = ({
            username: '',
            password: '',
            response: '',
        })

        this.handleChangeUser = this.handleChangeUser.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.globalState.removeAllLocalStorage();
    }

    handleChangeUser(event) {
        this.setState({
            username: event
        })
    }

    handleChangePassword(event) {
        this.setState({
            password: event
        })
    }

    handleSubmit(event) {
        this.setState({ loading: true })
        this.requests.getRequest('user/login', this.state)
            .then(data => {
                if (data.success == true) {
                    this.globalState.setLocalStorage('auth_token', data.data.token)
                    this.props.history.push('/panel/dashboard')
                } else {
                    this.setState({
                        response: data['message'],
                        error: true
                    })
                }
                this.setState({ loading: false })
            })
    }
    render() {

        let { error, response } = this.state;

        return (
            <Page title="Login">
                {error ? <Toast error content={response} onDismiss={() => { this.setState({ error: false }) }} /> : null}
                <Card sectioned>
                    <div className="p-5">
                        <FormLayout>
                            <TextField
                                value={this.state.username}
                                onChange={this.handleChangeUser}

                                label="Username"
                                type="text"
                                helpText={
                                    <span>
                                        We’ll use this email address to inform you on future changes to
                                        Polaris.
                            </span>
                                }
                            />

                            <TextField
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                                label="Password"
                                type="password"
                                helpText={
                                    <span>
                                        We’ll use this email address to inform you on future changes to
                                        Polaris.
                            </span>
                                }
                            />
                            <Button loading={this.state.loading} onClick={this.handleSubmit}>Submit</Button>
                        </FormLayout>
                    </div>
                </Card>
            </Page>
        )
    }
}
