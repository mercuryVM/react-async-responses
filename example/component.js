import React from 'react';
import { FetchDataAsync } from './api.js';
import {RegisterEvent, RemoveEvent} from 'react-async-responses'

class Component extends React.Component {
    constructor(props){
        super(props);
        RegisterEvent("dataFetched", (context, args) => {
            console.log(args[0]);
            this.setState({
                data: args[0]
            })
        }, this);
        this.state = { data: false }
    }

    componentWillUnmount(){
        RemoveEvent("dataFetched", this);
    }

    render(){
        const { data } = this.state;

        if(!data) {
            FetchDataAsync();
            return (null);
        }

        return (
            <span>{data}</span>
        )
    }
}

export default Component;