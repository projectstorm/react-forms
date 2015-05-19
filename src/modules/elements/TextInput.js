var React = require("react");
var Mixins = require("../FieldMixins");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName:"TextInput",
	mixins: [Mixins],
	render: function(){
		return React.createElement("input",{
			ref: this.props.name,
			className:"storm-field "+(this.props.invalid?'invalid':''),
			type:"text",
			onChange: this.change,
			placeholder: this.getPlaceholder()
		});
	}
});