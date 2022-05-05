import { Page, Card, DataTable, Pagination, Select, ButtonGroup, TextStyle, DisplayText, Button, Checkbox, Collapsible, Stack, TextField, Modal, TextContainer } from "@shopify/polaris";
import { Base } from "../../core";
import React from "react";
import "@shopify/polaris/dist/styles.css";


export default class Grid extends Base {

    constructor(props) {

        super(props);
        this.state = {
            data: "", list: [], page: 100, activePage: 1, pageFrom: 0, pageStart: 10, totalCount: 0, expanded: true, open: false, status: true,
            columns: {
                // Id: {
                //     name: "Id",
                // },
                user_id: {
                    lable: "UserId",
                    name: "user_id",
                    i_agree: true,
                },
                catalog: {
                    lable: "Catalog",
                    name: "Catalog",
                    i_agree: true,
                },
                username: {
                    lable: "Shop domain",
                    name: "shops.domain",
                    i_agree: true,
                },
                email: {
                    lable: "Shop email",
                    name: "shops.email",
                    i_agree: true,
                },
                shopify_plan: {
                    lable: "Shop Plan name",
                    name: "shops.plan_name",
                    i_agree: true,
                },
                updated_at: {
                    lable: "Updated at",
                    name: "Updated at",
                    i_agree: true,
                },
                created_at: {
                    lable: "Created at",
                    name: "Created at",
                    i_agree: true,
                },
                shop_url: {
                    lable: "Shops myshopify domain",
                    name: "shops.myshopify_domain",
                    i_agree: true,
                },
                loginBtn: {
                    lable: "Login",
                    name: "Login",
                    i_agree: true,
                    type: "button",
                    type2: true,
                },
                viewBtn: {
                    lable: "View",
                    name: "View",
                    i_agree: true,
                    type: "View",
                    type2: true,
                },
            },
            filter: ``,
            row: []
        };
    }

    fetch() {

        this.requests
            .getRequest(`frontend/admin/getAllUsers?activePage=${this.state.activePage}&count=${this.state.page}${this.state.filter}`)

            .then((success) => {
                this.setState({
                    list: [],
                    data: success,
                });
                // console.log(success)
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
                <div style={{ height: '500px' }}>
                    <Modal

                        open={this.state.active}
                        onClose={() => {
                            this.setState({ active: false });
                        }}
                        title="Reach more shoppers with Instagram product tags"
                        primaryAction={{
                            content: 'Add Instagram',
                            // onAction: this.state.active,
                        }}
                        secondaryActions={[
                            {
                                content: 'Learn more',
                                // onAction: this.state.active,
                            },
                        ]}
                    >
                        <Modal.Section>
                            <TextContainer>
                                <p>
                                    Use Instagram posts to share your products with millions of
                                    people. Let shoppers buy from your store without leaving
                                    Instagram.
                                </p>
                            </TextContainer>
                        </Modal.Section>
                    </Modal>
                </div>
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

    filter() {
        let filter = ``

        Object.keys(this.state.columns).map(val => {
            if (this.state.columns[val].textVal != '' && this.state.columns[val].textVal != undefined) {
                filter = `+&filter[${this.state.columns[val].name}][${this.state.columns[val].selectVal}]=${this.state.columns[val].textVal}`
            }
            console.log(filter);
            this.setState({
                filter: filter
            }, () => {
                if (this.state.status == true) {
                    this.fetch()
                    this.state.status = false
                }

            })
        })
        this.setState({ status: true })
    }

    DataTable() {

        let rows = [];
        var nextRow = [];

        const options = [
            { label: "Equals", value: "1" },
            { label: "Not Equals", value: "2" },
            { label: "Contains", value: "3" },
            { label: "Does Not Contains", value: "4" },
            { label: "Starts With", value: "5" },
            { label: "Ends With", value: "6" },
        ];

        this.state.list.map((li) => {
            Object.keys(this.state.columns).map((data) => {
                if (this.state.columns[data].i_agree == true) {
                    if (this.state.columns[data].type2 != true) {
                        nextRow.push(li[data]);
                    } else if (this.state.columns[data].type === "button") {
                        nextRow.push(
                            <Button
                                primary
                                onClick={() => {
                                    this.setState(
                                        {
                                            UserId: li.user_id,
                                        },
                                        () => {
                                            this.requests
                                                .getRequest(
                                                    "frontend/admin/getLoginAsUserUrl?db=db&user_id=" +
                                                    this.state.UserId
                                                )
                                                .then((msg) => {
                                                    this.setState(
                                                        {
                                                            url: msg.data,
                                                        },
                                                        () => {
                                                            window.open(this.state.url);
                                                        }
                                                    );
                                                });
                                        }
                                    );
                                }}
                            >
                                Login
                            </Button>
                        );
                    } else if (this.state.columns[data].type === "View") {
                        nextRow.push([
                            <Button
                                primary
                                onClick={() => {
                                    this.setState({
                                        active: !this.state.active,
                                    });
                                }}
                            >View User
                            </Button>,
                        ]);
                    }
                } else {
                    nextRow.push([]);
                }
            });
            rows.push(nextRow);

            nextRow = [];
        });
        let fields = [];

        Object.keys(this.state.columns).map((val) => {
            if (this.state.columns[val].i_agree == true) {
                if ((this.state.columns[val].type2 != true)) {
                    fields.push([[<Select
                        options={options}
                        value={this.state.columns[val].selectVal}
                        onChange={(e) => {
                            this.setState(
                                () => {
                                    this.state.columns[val].selectVal = e
                                }, () => {
                                    this.filter()
                                }
                            )
                        }
                        } />],
                    [<TextField
                        value={this.state.columns[val].textVal}
                        onChange={(e) => {
                            this.setState(
                                () => {
                                    this.state.columns[val].textVal = e
                                }, () => {
                                    this.filter()
                                }
                            )
                        }} placeholder={val} />]])
                } else {
                    return fields.push([]);
                }
            } else {
                return fields.push([]);
            }
        });

        rows.unshift(fields);

        return (

            <DataTable
                columnContentTypes={[
                    'text',
                ]}
                headings={Object.keys(this.state.columns).map((data) => {
                    if (this.state.columns[data].i_agree == true) {
                        return <h3><TextStyle variation="strong">{this.state.columns[data].lable}</TextStyle></h3>
                    }
                })}
                rows={rows}
            />

        );
    }
}
