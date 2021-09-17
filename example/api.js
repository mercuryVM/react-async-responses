import { CallEvent } from 'react-async-response';

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
