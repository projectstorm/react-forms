var React = require("react");
var _ = require("lodash");
var ComponentMixin = require("../ComponentMixin");
var PlaceholderMixin = require("../PlaceholderMixin");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: "Text Area",
	mixins: [ComponentMixin(),PlaceholderMixin],

	render: function(){

		var props = _.merge({
			className: "storm-area",
			placeholder: this.getPlaceholder(),
			onChange: function(event){
				this.setValue(event.target.value);
			}.bind(this)
		},this.props);
		props.value = this.state.value;
		if(!this.state.value){
			props.value = "";
		}
		return React.DOM.textarea(props);
	}
});
