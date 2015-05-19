var React = require("react");
/**
 * @author Dylan Vorster
 */
module.exports = {
	
	//form class and form factory
	Form: require("./modules/Form"),
	FormFactory: React.createFactory(require("./modules/Form")),

	//useful methods
	Engine : require("./modules/Engine"),
	
	//raw versions of the elements
	classes:{
		Input:		require("./modules/elements/TextInput"), //alias
		TextInput:	require("./modules/elements/TextInput"), //alias
		Text:		require("./modules/elements/TextInput"),

		Model:		require("./modules/layout/Model"),

		Multi:		require("./modules/layout/Multi"),

		Select:		require("./modules/elements/Select"),
		Dropdown:	require("./modules/elements/Select"), //alias

		Boolean:	require("./modules/elements/CheckBox"), //alias
		Checkbox:	require("./modules/elements/CheckBox"),

		File:		require("./modules/elements/File"),
		Area:		require("./modules/elements/TextArea"),
		Auto:		require("./modules/elements/AutoInput")
	},
	
	//factory versions of the elements
	factories:{
		Input:		React.createFactory(require("./modules/elements/TextInput")), //alias
		TextInput:	React.createFactory(require("./modules/elements/TextInput")), //alias
		Text:		React.createFactory(require("./modules/elements/TextInput")),

		Model:		React.createFactory(require("./modules/layout/Model")),

		Multi:		React.createFactory(require("./modules/layout/Multi")),

		Select:		React.createFactory(require("./modules/elements/Select")),
		Dropdown:	React.createFactory(require("./modules/elements/Select")), //alias

		Boolean:	React.createFactory(require("./modules/elements/CheckBox")), //alias
		Checkbox:	React.createFactory(require("./modules/elements/CheckBox")),

		File:		React.createFactory(require("./modules/elements/File")),
		Area:		React.createFactory(require("./modules/elements/TextArea")),
		Auto:		React.createFactory(require("./modules/elements/AutoInput"))
	}
};