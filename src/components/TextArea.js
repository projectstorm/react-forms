var React = require("react");
var _merge = require("lodash/merge");
var ComponentMixin = require("../ComponentMixin");
var PlaceholderMixin = require("../PlaceholderMixin");
/**
 * @author Dylan Vorster
 */
module.exports = React.createClass({
	displayName: "Text Area",
	mixins: [ComponentMixin(),PlaceholderMixin],
	
	render: function(){
		
		var props = _merge({
			className: "storm-area",
			placeholder: this.getPlaceholder(),
			onChange: function(event){
				this.setValue(event.target.value);
			}.bind(this)
		},this.props);
		
		props.value = this.state.value;
		
		return React.DOM.textarea(props);
	}
});