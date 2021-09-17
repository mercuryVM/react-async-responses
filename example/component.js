import React from 'react';
import { FetchDataAsync } from './api.js';

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