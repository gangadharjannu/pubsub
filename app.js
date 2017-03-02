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