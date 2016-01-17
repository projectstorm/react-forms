var React = require("react");
var ValidationComponent = require("../components/ValidationComponent");
var TextField = require("../components/TextField");
var Toolkit = require("../Toolkit");
var _merge = require("lodash/merge");
/**
 * @author Dylan Vorster
 */
module.exports = function(props){
	return React.createElement(ValidationComponent,_merge(
		{
			validate: function(value){
				if(!Toolkit.validateEmail(value)){
					return "Email Invalid";
				}
			}
		},props),React.createElement(TextField,props)
	);
};