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
  .runner(function*() {
    let sq1 = getFile("file1");
    let sq2 = getFile("file2");
    let sq3 = getFile("file3");

    output(yield sq1);
    output(yield sq2);
    output(yield sq3);
  })
  .val(function() {
    output("Complete!!!");
  });
