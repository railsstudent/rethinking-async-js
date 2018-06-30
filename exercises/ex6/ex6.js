function fakeAjax(url, cb) {
  var fake_responses = {
    file1: "The first text",
    file2: "The middle text",
    file3: "The last text"
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

  console.log("Requesting: " + url);

  setTimeout(function() {
    cb(fake_responses[url]);
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

// **************************************

function getFile(file) {
  return ASQ(function(done) {
    fakeAjax(file, done);
  });
}

ASQ()
  .seq(
    ...["file1", "file2", "file3"].map(getFile).map(function(sq) {
      return function() {
        return sq.val(output);
      };
    })
  )
  .val(function() {
    output("Complete!!!");
  });
