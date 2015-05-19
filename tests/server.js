var SessionModule = require("storm-serve"),
	express = require('express'),
	app = express();

app.use(SessionModule.main({
	mappings : {
		"/index.html" : __dirname+"/index.html",
		"/test.js" : __dirname+"/test.js",
		"/test.scss" : __dirname+"/test.scss"
	},
	deps : {
		uglify: false
	}
}));
app.use(SessionModule.scss());
app.listen(3001);
console.info("http started on port: 3001");