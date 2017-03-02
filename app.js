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