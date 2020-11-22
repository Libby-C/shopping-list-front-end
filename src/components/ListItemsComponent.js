import React, { Component } from 'react';
import { Table, Checkbox, Button } from 'semantic-ui-react';


class ListItemsComponent extends Component {

    

    render() {
        return <>
            <Table.Cell>{this.props.name}</Table.Cell>
            <Table.Cell>
                <Checkbox checked={this.props.purchased}
                            onClick={(event, data) => {this.props.onClickPurchased(this.props.itemId, data)}}/>
            </Table.Cell>
            <Table.Cell>{this.props.price}</Table.Cell>
            <Table.Cell>
                <Button content ='Delete Item' onClick={() => {this.props.onDeleteButtonClick(this.props.itemId)}}/>
            </Table.Cell>
            </>
    }
}

export default ListItemsComponent;