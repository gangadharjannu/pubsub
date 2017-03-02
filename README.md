# pubsub - in Javascript
I was given a coding task to implement a `pubSub` pattern in one interview and here I will walk you through, how I implemented step by step.  
Since pubSub pattern relies on messages or events, I needed a way to store them. So for that I have used `Object`.  

If you dont know much about pub sub pattern, below is the short description.  
> It is an event system.  
    1. Subscribers will subscribe for an event  
    2. Publisher will publish an event with data.  
    3. All the subscribers who are listening to that event will get the data published by   publisher.  

Here is the initial implementation of pubSub pattern. It will enables us to subscribe for the event and publish the event, however there is a gotcha in that.  
Below code enables us to listen for the message one when you subscribe first time. 
When we listen multiple times, it is skipping remaining subscribers because we are checking if the event exists in our object.

## Version 1
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

---
Since **version 1** will allow us to subscribe one time only I added an array so that it allows multiple subscribers.  

Here I changed two things:  
1. In `listen` I am checking if the message exists in our Object, if true we are simply pushing the listener function else we are assigning an array.  
2. In `trigger` instead of directly executing the listener function I'm iterating over given event subscribers and then executing the listners.

## Version 2
```javascript  
var pubSub = (function() {
    var messages = {},
        hasOwnProp = Object.prototype.hasOwnProperty;

    function listen(message, listenerFn) {
        if (!hasOwnProp.call(messages, message)) {
            messages[message] = [];
        }
        messages[message].push(listenerFn);
    }

    function trigger(message, data) {
        if (!messages[message]) {
            return
        }
        messages[message].forEach(function(listner) {
            listner(data);
        });
    }

    return {
        publish: trigger,
        subscribe: listen
    };
}());
```
