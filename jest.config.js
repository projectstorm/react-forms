// jest.config.js
module.exports = {
	verbose: true,
	moduleFileExtensions: ["ts", "tsx", "js", "json"],
	transform: {
		"^.+\\.(ts|tsx)$": "./tests/helpers/tsx-preprocessor.js",
		"^.+\\.(scss)$": "./tests/helpers/scss-preprocessor.js"
	},
	moduleNameMapper:{
		"\\.(css|less)$": __dirname+"/tests/helpers/stylemock.js"
	},
	"testMatch": [
		"**/tests/*\.test\.*"
	]
};
