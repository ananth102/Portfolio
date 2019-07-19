let y = require("yahoo-stocks");
y.lookup("AAPL").then(response => {
  console.log(response);
});
