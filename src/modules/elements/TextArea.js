var React = require("react");
var Mixins = require("../FieldMixins");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName:"TextArea",
	mixins: [Mixins],
	render: function(){
		return React.createElement("textarea",{
			ref:"value",
			className:"storm-field",
			onChange: this.change,
			placeholder: this.getPlaceholder(),
			rows: this.props.rows,
			cols: this.props.cols
		});
	},
});