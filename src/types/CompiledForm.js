var React = require("react");
var Form = require("../components/Form");
var Toolkit = require("../Toolkit");
var Table = require("../components/Table");
/**
 * @author Dylan Vorster
 * @param {type} props
 * @param {type} children
 */
module.exports = function(props,children){
	return (
		React.createElement(Form,props,
			Toolkit.compile(children)
		)
	);
};