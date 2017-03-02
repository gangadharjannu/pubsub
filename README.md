# pubsub - in Javascript
I was given a coding task to implement a `pubSub` pattern in one interview and here I will walk you through, how I implemented step by step.  
Since pubSub pattern relies on messages or events, I needed a way to store them. So for that I have used `Object`.  

If you dont know much about pub sub pattern, below is the short description.  
> It is an event system.  
    1. Subscribers will subscribe for an event  
    2. Publisher will publish an event with data.  
    3. All the subscribers who are listening to that event will get the data published by   publisher.  

Here is the initial implementation of pubSub pattern, however there is a gotcha in that.  
Below code enables us to listen for the message one time. 
If we listen multiple times the last one will replace the existing listener, since we are using object.

```javascript  

var pubSub = (function() {
    var messages = {};

    function listen(message, listenerFn) {
        if (!messages[message]) {
            messages[message] = listenerFn;
        }
    }

    function trigger(message, data) {
        if (!messages[message]) {
            return
        }
        messages[message](data);
    }

    return {
        publish: trigger,
        subscribe: listen
    };
}());
```

