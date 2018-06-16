// jest.config.js
module.exports = {
	verbose: true,
	moduleFileExtensions: ["ts", "tsx", "js", "json"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
		"^.+\\.(scss)$": "./tests/helpers/scss-preprocessor.js"
	},
	moduleNameMapper:{
		"\\.(css|less)$": __dirname+"/tests/helpers/stylemock.js",
		"\\@storybook/angular/options$": __dirname+"/tests/helpers/stylemock.js",
	},
	"testMatch": [
		"**/tests/*\.test\.*"
	],
	"snapshotSerializers": [
		"jest-glamor-react"
	  ]
};
