$(document).ready(function() {
  var $btn = $("#btn"),
    $list = $("#list");

  var clicked = ASQ.react.of(),
    msgs = ASQ.react.of(),
    latest = null;

  $btn.click(function(evt) {
    clicked.push(evt);
  });

  clicked.val(function(evt) {
    latest = evt;
  });

  setInterval(function() {
    if (latest) {
      msgs.push("clicked!");
      latest = null;
    }
  }, 1000);

  msgs.val(function(msg) {
    $list.append("<div>" + msg + "</div>");
  });
});
