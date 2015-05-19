var React = require("react");
var Mixins = require("../FieldMixins");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: "File",
	mixins: [Mixins],
	render: function(){
		return React.createElement("input",{
			ref:"value",
			className:"storm-field",
			type:"file",
			onChange: this.change
		});
	}
});