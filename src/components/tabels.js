import React, { Component } from 'react'
import { Table} from 'antd';

class TableComp extends Component {
    
    render() {
        return (
            <Table columns={this.props.column} dataSource={this.props.data} pagination={false} bordered />
        )
    }
}

export default TableComp;