const glob = require("glob");
const path = require("path");

// glob.sync("./models/*.js").forEach(function (file) {
//   require(path.resolve(file));
// });

const app = require("./app");
app.set("port", process.env.PORT || 80);

const server = app.listen(app.get("port"), () => {
  console.log(`Server running on PORT: ${server.address().port}`);
});
