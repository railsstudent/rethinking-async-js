$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list");

	// TODO: setup sampling go-routine and
	// channel, populate $list
  var clicked = ASQ.csp.chan(),
    msgs = ASQ.csp.chan(),
    queuedClick;

	// Hint: ASQ().runner( .. )
	ASQ().runner(
		ASQ.csp.go(sampleClick),
		ASQ.csp.go(logClick)
	);

  $btn.click(function(evt) {
		if (!queuedClick) {
			queuedClick = ASQ.csp.putAsync(clicked, evt);
			queuedClick.then(function() {
				queuedClick = null;
			});
		}
	});

	function *sampleClick() {
		while(true) {
			yield ASQ.csp.take(ASQ.csp.timeout(1000));
			yield ASQ.csp.take(clicked);
			yield ASQ.csp.put(msgs, 'clicked!');
		}
	}

	function *logClick() {
		while(true) {
			let msg = yield ASQ.csp.take(msgs);
			$list.append(`<div>${msg}</msg>`);
		}
	}
});
