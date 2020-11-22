import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import ListComponent from '../components/ListComponent';


class ListContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            listItems: null,
            errors: false,
            errorMessage: "",
            listBudget: 0
        }
        const axios = require('axios');
        this.axiosInstance = axios.create({
            baseURL: 'http://homestead.shopping',
            headers: {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Accept',
                    "Access-Control-Allow-Credentials": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
                    },
            timeout: 1000
        });
    }
 
    componentDidMount() {

        let self = this

        this.axiosInstance.get('/user/1/lists')
        .then(function (response) {
            self.setState({
                listItems: response.data.list_items,
                listBudget: response.data.list_budget,
                loading: false
            })
          })
          .catch(function (error) {
            self.setState({
                errors: true,
                errorMessage: error,
                loading: false
            })
            console.log(error);
          });
    }

    onClickPurchased = (itemId, {checked}) => {
        let self = this
        if (itemId) {
            this.axiosInstance.put(`user/1/lists/1/update-item/${itemId}`, {
                'purchased': checked
            })
              .then(function (response) {
                let shoppingList = self.state.listItems 
                let updatedIndex = shoppingList.findIndex((item) => item.id === itemId)
                shoppingList[updatedIndex].is_purchased = checked 
                console.log(shoppingList)
                self.setState({
                    listItems: shoppingList
                })
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }

    onDeleteButtonClick = (itemId) => {
        let self = this
        if (itemId) {
            this.axiosInstance.delete(`user/1/lists/1/delete-item/${itemId}`)
              .then(function (response) {
                let newList = self.state.listItems
                let removedItem = newList.findIndex((item) => item.id === itemId)
                newList.splice(removedItem, 1)
                self.setState({
                    listItems: newList
                })
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }

    onAddButtonClick = (input) => {
        let self = this
        if (input) {
            this.axiosInstance.post('user/1/lists/1', {
                'items': [input]
              })
              .then(function (response) {
                let newList = self.state.listItems
                response.data.added_item.product_name = input
                newList.push(response.data.added_item)
                self.setState({
                    listItems: newList
                })
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }

    render() {  

        if (this.state.loading) {
            return <Dimmer active >
                        <Loader/>
                    </Dimmer>
        } else {
            return  <div>
                <ListComponent
                    listItems={this.state.listItems}
                    listBudget={this.state.listBudget}
                    onClickPurchased={this.onClickPurchased}
                    onAddButtonClick={this.onAddButtonClick}
                    onDeleteButtonClick={this.onDeleteButtonClick}
                />
            </div>
        }


    }
}

export default ListContainer;