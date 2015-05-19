var React = require("react");
var Mixins = require("../FieldMixins");
/**
 * @author Dylan Vorster
 * @type @exp;React@call;createClass
 */
module.exports = React.createClass({
	displayName:"Number",
	mixins: [Mixins],
	render: function(){
		return React.createElement("input",{
			ref:"value",
			className:"storm-field "+(this.props.invalid?'invalid':''),
			type:"text",
			onChange: this.change,
			placeholder: this.getPlaceholder()});
	}
});