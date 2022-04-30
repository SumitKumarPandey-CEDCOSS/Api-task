import React, {Component} from 'react';
import { DataTable as Table } from '@shopify/polaris';
import PropsType from 'prop-types';

class DataTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns : [],
            rows: props.rows
        };
    }


    render() {

        let { columns, rows } = this.state;

        return (
            <div>
                <Table
                    columnContentTypes={[]}
                    headings={columns}
                    rows={rows}/>
            </div>
        );
    }
}

function moldColumns(columns) {
    return Object.keys(columns)
}

DataTable.PropsType = {
    rows : PropsType.array.isRequired,
    columns : PropsType.object.isRequired,
};

DataTable.defaultProps = {
    rows : [],
    columns : [],
};

export default DataTable;