# react-async-responses

This code will handle and link all asynchronous or unexpected data from backend to your React Components.

# Install

    npm i react-async-responses


# Functions

|FUNCTION|ACTION                         |RETURNS|
|----------------|-------------------------------|-----------------------------|
|RegisterEvent (eventName, callback(context, args), context) : boolean |`Register an callable event.`            |Returns true if the event has not already been registered, and false if the event has already registered.|
|CallEvent(eventName, args) : boolean|`Call an event`            |Returns true if event exists          |
|RemoveEvent(context) : void         |`Unregister an event`||

# Example

api.js

    import { CallEvent } from 'react-async-responses';
    
    function GetResponseFromServer(){
		return {
			code: 200,
			status: "IT IS WORKS!"
		}
	}

	function FetchDataAsync(){
		const data = GetResponseFromServer();
		CallEvent("dataFetched", data);
	}

	export {
		FetchDataAsync
	}

component.js

    
    import React from 'react';
    import { FetchDataAsync } from './api.js';
    import { RegisterEvent, RemoveEvent } from 'react-async-responses'
    
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
