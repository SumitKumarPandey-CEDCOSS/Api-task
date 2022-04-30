import { Page, Card, DataTable, Pagination, Select, ButtonGroup, TextStyle, DisplayText, Button, Checkbox, Collapsible, Stack } from "@shopify/polaris";
import { Base } from "../../core";
import React, { useState } from "react";
import "@shopify/polaris/dist/styles.css";


export default class Grid extends Base {

    constructor(props) {

        super(props);
        this.state = {
            data: "", list: [], page: 100, activePage: 1, pageFrom: 0, pageStart: 10, totalCount: 0, expanded: true, open: false,
            columns: {
                // Id: {
                //     name: "Id",
                // },
                user_id: {
                    name: "UserId",
                    i_agree: true,
                },
                catalog: {
                    name: "Catalog",
                    i_agree: true,
                },
                username: {
                    name: "Shop domain",
                    i_agree: true,
                },
                email: {
                    name: "Shop email",
                    i_agree: true,
                },
                shopify_plan: {
                    name: "Shop Plan name",
                    i_agree: true,
                },
                updated_at: {
                    name: "Updated at",
                    i_agree: true,
                },
                created_at: {
                    name: "Created at",
                    i_agree: true,
                },
                shop_url: {
                    name: "Shops myshopify_domain",
                    i_agree: true,
                },
            },
            row: []
        };
    }

    fetch() {

        this.requests
            .getRequest('frontend/admin/getAllUsers', { activePage: this.state.activePage, count: this.state.page })
            .then((success) => {
                this.setState({
                    list: [],
                    data: success,
                });
                Object.keys(this.state.data).forEach((val) => {

                    if (val === "data") {
                        Object.keys(this.state.data[val]).forEach((val2) => {
                            if (val2 === "rows") {
                                this.state.data[val][val2].forEach((val3) => {
                                    // console.log(val3);
                                    this.setState({
                                        list: [...this.state.list, val3],
                                        totalCount: this.state.data.data.count,
                                    });
                                });
                            }
                        });
                    }
                });
            });
    }

    componentDidMount() {
        this.fetch();
    }

    View() {
        return (
            <Card sectioned>
                <Stack vertical>
                    <div>
                        <div style={{ float: "right" }}>
                            <Button
                                primary={true}
                                onClick={() => {
                                    this.setState({ open: !this.state.open });
                                }}
                                ariaExpanded={this.state.open}
                                ariaControls="basic-collapsible"
                            >
                                View Columns
                            </Button>
                        </div>
                        <div className="row">
                            <div className="w-25">
                                <Pagination
                                    label="Results"
                                    hasPrevious={this.state.activePage > 1 ? true : false}
                                    onPrevious={() => {
                                        this.setState({
                                            pageStart: parseInt(this.state.pageStart) - parseInt(this.state.page),
                                            pageFrom: parseInt(this.state.pageFrom) - parseInt(this.state.page),
                                            activePage: this.state.activePage - 1,
                                        }, () => {
                                            this.fetch()
                                        })
                                        console.log('Previous');
                                    }}
                                    hasNext
                                    onNext={() => {
                                        this.setState({
                                            pageStart: parseInt(this.state.pageStart) + parseInt(this.state.page),
                                            pageFrom: parseInt(this.state.pageFrom) + parseInt(this.state.page),
                                            activePage: this.state.activePage + 1
                                        }, () => { this.fetch() })
                                        console.log('Next');
                                    }}
                                />
                            </div>
                            <div className="w-25">{this.PageSize()}</div>
                        </div>
                    </div>
                    <Collapsible
                        open={this.state.open}
                        id="basic-collapsible"
                        transition={{ duration: "150ms", timingFunction: "ease" }}
                    >
                        <div class="row">
                            {Object.keys(this.state.columns).map((element) => {
                                return (
                                    <div class="col-sm-3">
                                        <Checkbox
                                            label={this.state.columns[element].name}
                                            checked={this.state.columns[element].i_agree}
                                            onChange={() => {
                                                this.setState((event) => {
                                                    event.columns[element].i_agree = !event.columns[element].i_agree;
                                                    return event;
                                                });
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Collapsible>
                </Stack>
            </Card >
        );
    }

    render() {
        return (
            <Page title="Data Grid....">
                <DisplayText size="large">Showing from {this.state.pageFrom} to {this.state.pageStart} of {this.state.totalCount} users</DisplayText>

                <div class="container">
                    <div className="row">
                        <div className="w-100">{this.View()}</div>
                    </div>
                </div>

                <Card sectioned subdued>{this.DataTable()}</Card>
            </Page>
        );
    }

    PageSize() {
        const options = [
            { value: '', label: 'Sort By' },
            { value: '10', label: 10 },
            { value: '20', label: 20 },
            { value: '30', label: 30 },
        ];
        return (
            <Select
                options={options}
                onChange={(e) => {
                    this.setState({ page: e }, () => {
                        this.fetch();
                    });
                }}
                value={this.state.page}
            />
        );
    }

    DataTable() {

        let rows = [];
        var nextRow = [];

        this.state.list.map((li) => {
            Object.keys(this.state.columns).map((data) => {
                if (this.state.columns[data].i_agree == true) {
                    nextRow.push(li[data]);
                }
            });
            rows.push(nextRow);
            nextRow = [];
        });

        return (
            <DataTable
                columnContentTypes={[
                    'text',
                    'text',
                ]}
                headings={Object.keys(this.state.columns).map((data) => {
                    if (this.state.columns[data].i_agree == true) {
                        return <h3><TextStyle variation="strong">{this.state.columns[data].name}</TextStyle></h3>
                    }
                })}
                rows={rows}
            />
        );
    }
}
