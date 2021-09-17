var events = new Map();

class Event{
    constructor(name){
        this.name = name;
        this.handlers = new Map();
    }

    AddResponse(context, func){
        if(this.handlers.has(context)) this.handlers.get(context).toCall.push(func);
        else {
            const h = new Handler(context);
            h.toCall.push(func);
            
            this.handlers.set(context, h);
        }
    }

    Call(args){
        this.handlers.forEach((value, key) =>{
            value.Call(args);
        });
    }
    
    RemoveCntx(context){
        if(this.handlers.has(context)) this.handlers.delete(context);
    }
}

class Handler{
    constructor(context){
        this.context = context;
        this.toCall = [];
    }

    Call(args){
        this.toCall.forEach(func => {
            func(this.context, args);
        });
    }
}

function RegisterEvent(name, func, context){
    if(events.has(name)){
        events.get(name).AddResponse(context, func);
    }else{
        const e = new Event(name);
        e.AddResponse(context, func);
        events.set(name, e);
    }
}

function CallEvent(name, ...args){
    if(events.has(name)){
        events.get(name).Call(args);
        return true;
    }else{
        return false;
    }
}

function RemoveEvent(name, context){
    if(events.has(name)){
        events.get(name).RemoveCntx(context);
        if(events.get(name).handlers.size === 0) events.delete(name);
    }
}

export {
    RegisterEvent, 
    CallEvent,
    RemoveEvent
}