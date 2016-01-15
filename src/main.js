var React = require("react");
/**
 * @author Dylan Vorster
 */
module.exports = {
	DOM:{
		//base
		form:					React.createFactory(require("./components/Form")),
		button:					React.createFactory(require("./components/Button")),
		textfield:				React.createFactory(require("./components/TextField")),
		textarea:				React.createFactory(require("./components/TextArea")),
		checkbox:				React.createFactory(require("./components/Checkbox")),
		select:					React.createFactory(require("./components/Select")),
		dropdown:				React.createFactory(require("./components/Dropdown")),
		autocompleter:			React.createFactory(require("./components/Autocompleter")),
		errorcomponent:			React.createFactory(require("./components/ErrorComponent")),
		validationcomponent:	React.createFactory(require("./components/ValidationComponent")),
		table:					React.createFactory(require("./components/Table")),
		group:					React.createFactory(require("./components/Group")),
		multi:					React.createFactory(require("./components/Multi")),
		
		//types
		set:			React.createFactory(require("./types/Set")),
		keylist:		React.createFactory(require("./types/KeyList")),
		list:			React.createFactory(require("./types/List")),
		email:			require("./types/Email"),
		compiledform:	require("./types/CompiledForm")
	}
};