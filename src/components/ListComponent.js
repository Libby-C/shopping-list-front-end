import React, { Component } from 'react';
import { Button, Input, Table } from 'semantic-ui-react';
import ListItemsComponent from './ListItemsComponent';


class ListComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addItemInput: ""
        }
    }

    onInputEntry = (event) => {
        this.setState({
            addItemInput: event.target.value
        })
    }

    render() {
        let itemsInList = null;
        if (this.props.listItems) {
            itemsInList = this.props.listItems.map((listItem) =>
                <Table.Row>
                    <ListItemsComponent
                        itemId={listItem.id}
                        productId={listItem.product_id}
                        purchased={listItem.is_purchased}
                        name={listItem.product_name}
                        price={listItem.product_price}
                        weightOnList={listItem.weight_on_list}
                        onClickPurchased={this.props.onClickPurchased}
                        onDeleteButtonClick={this.props.onDeleteButtonClick}
                    />
                </Table.Row>
            )
        }
        
        return <> 
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item Name</Table.HeaderCell>
                        <Table.HeaderCell>Purchased</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {itemsInList}
                <Input onChange={(event) =>{this.onInputEntry(event)}} placeholder='Add New Item To Shopping List..'/>
                <Button content ='Add Item' onClick={() => {this.props.onAddButtonClick(this.state.addItemInput)}}/>
                </>
    }
}

export default ListComponent;